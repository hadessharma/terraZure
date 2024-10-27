import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import connectToDB from "@/lib/db";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    //     GoogleProvider({
    //       clientId: process.env.GOOGLE_CLIENT_ID,
    //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });
      session.user.id = sessionUser?._id;
      session.user.name = sessionUser?.name;
      session.user.image = sessionUser?.profilePic;
      return session;
    },
    async signIn({ profile }) {
      try {
        connectToDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            name: profile.name,
            email: profile.email,
            profilePic: profile.avatar_url
              ? profile.avatar_url
              : profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
