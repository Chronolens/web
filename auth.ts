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
        const response = await fetch(`${API_URL}/signin`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) return null;
        return (await response.json()) ?? null;
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
      } else if (Date.now() < token.expires_at) {
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");
        try {
          // TODO: refresh token logic
          return token;
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
    signIn: "/signin",
  },
});
