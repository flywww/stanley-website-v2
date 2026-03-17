import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const adminGitHubLogin = process.env.ADMIN_GITHUB_LOGIN?.trim().toLowerCase();

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const login = typeof profile?.login === "string" ? profile.login.toLowerCase() : undefined;

      if (!adminGitHubLogin) {
        return false;
      }

      return login === adminGitHubLogin;
    },
    async jwt({ token, profile }) {
      if (typeof profile?.login === "string") {
        token.login = profile.login;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.login === "string") {
        session.user.login = token.login;
      }

      return session;
    },
  },
});
