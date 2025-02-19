import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createStudent, getStudent } from "./data-services";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider,
  ],
  callbacks: {
    authorized({ auth, request }) {
      return auth?.user ? true : false;
    },
    async signIn({ user, account, profile }) {
      try {
        const isAlreadyStudent = await getStudent(user.email);

        if (!isAlreadyStudent) {
          await createStudent({ email: user.email, name: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getStudent(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
