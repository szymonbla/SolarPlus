import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "lib/primsadb";
import { RoutesDefinition } from "common/routes";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
    // ...add more providers here
  ],
  session: { maxAge: 180 },
  secret: `${process.env.GOOGLE_CLIENT_SECRET}`,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: RoutesDefinition.login,
  },
});
