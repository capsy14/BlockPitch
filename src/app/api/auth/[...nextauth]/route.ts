import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

// 1. Define your NextAuth options
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // async authorize(credentials) {
      //   await connectToDatabase();
      //   const user = await User.findOne({ email: credentials.email }).exec();
      //   if (!user) return null;
      //   console.log("User found:", user);
      //   const isValid = await verifyPassword(credentials.password, user.password);
      //   if (!isValid) return null;
      //   // Return user object for session
      //   return {
      //     id: user._id.toString(),
      //     email: user.email,
      //     name: user.name,
      //     role: user.role,
      //   };
      // }
      async authorize(credentials) {
        await connectToDatabase();

        // disambiguated overload:
        const user = await (User.collection).findOne({ email: credentials.email });
        // const user = await User.findOne({ email: credentials.email }).exec();

        if (!user) return null;

        console.log("User found:", user);

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: { strategy: "jwt" as SessionStrategy }, // Explicitly type the strategy
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login" // Optional: your custom login page
  }
};

// 2. Export GET and POST handlers for the App Router
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
