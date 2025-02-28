import { login, refreshAccessToken } from "@/lib/network/network";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
            throw new CredentialsSignin();
          }
          const loginData = await response.json();
          return loginData ?? null;
        } catch (e) {
          console.log("something wrong with server address");
          throw new CredentialsSignin();
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
        return token;
      } else {
        console.log("Token expired, trying to refresh");
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new TypeError("Missing refresh_token");
        try {
          // FIX: change this to the network folder
          const refreshResponse = await refreshAccessToken(token);
          const refreshResponseBody = await refreshResponse.json();
          if (!refreshResponse.ok) {
            console.error("Error refreshing access_token", refreshResponse);
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
