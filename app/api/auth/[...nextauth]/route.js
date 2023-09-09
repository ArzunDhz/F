import { User } from "@models/User";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "936095275055-dplhj5u9cbfecs29h2o7eg2akf92q4n1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    GithubProvider({
      clientId: "5cd9f82a03464c7d5f79",
      clientSecret: "94f6a19bf0b7ba717e99b1cc3c9130811d060ea3",
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile, credentials, user, account }) {
      try {
        await connectToDB();
        const user = await User.findOne({ email: profile.email });
        if (user) {
          return true;
        }

        await User.create({
          email: profile.email,
          username: profile.name,
          image: profile.url,
        });

        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
