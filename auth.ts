import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import DEFAULT_SERVER_ADDRESS from "@/lib/constants";
import { login } from "@/lib/network/network";

class ServerError extends CredentialsSignin {
  code: "ServerError";
}
class InvalidCredentials extends CredentialsSignin {
  code: "InvalidCredentials";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await login(credentials);
          if (!response.ok) {
            throw new InvalidCredentials();
          }
          const loginData = await response.json();
          return loginData ?? null;
        } catch (e) {
          console.log("something wrong with server address")
          throw new ServerError();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
          expiresAt: user.expires_at,
        };
      } else if (Date.now() < Number(token.expiresAt)) {
        console.log("Token still valid");
        return token;
      } else {
        console.log("Token expired, trying to refresh");
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");
        try {
          // FIX: change this to the network folder
          const refreshResponse = await fetch(`${DEFAULT_SERVER_ADDRESS}/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: token.accessToken,
              refresh_token: token.refreshToken,
            }),
          });
          const refreshResponseBody = await refreshResponse.json();
          if (!refreshResponse.ok) {
            console.error("Error refreshing access_token", refreshResponse);
            // If we fail to refresh the token, return an error so we can handle it on the page
            token.error = "RefreshTokenError";
            return token;
          }
          return {
            ...token,
            accessToken: refreshResponseBody.access_token,
            refreshToken: refreshResponseBody.refresh_token,
            expiresAt: refreshResponseBody.expires_at,
          };
        } catch (error) {
          console.error("Error refreshing access_token", error);
          // If we fail to refresh the token, return an error so we can handle it on the page
          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
