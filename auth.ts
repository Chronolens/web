import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import API_URL from "./app/lib/constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        // FIX: relocate this fetch to the network file
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) {
          console.error("Error logging in", response);
          return null;
        }
        const loginData = await response.json();
        return loginData ?? null;
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
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");
        try {
          const refreshResponse = await fetch(`${API_URL}/refresh`, {
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
      }     },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
