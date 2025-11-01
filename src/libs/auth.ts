import { NextAuthOptions } from 'next-auth';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import sanityClient from './sanity';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // Allow sign in for all cases - the adapter will handle account linking
      // The allowDangerousEmailAccountLinking flag on providers allows accounts
      // with the same email to be linked together
      
      // For OAuth providers, we always allow sign in
      // If a user exists with the same email, the adapter will link the account
      // If not, a new user will be created
      return true;
    },
    jwt: async ({ token, user, account, profile }) => {
      // Persist the OAuth account info and user info to the token right after signin
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
        token.picture = user.image ?? undefined;
      }
      
      // Fetch user ID from Sanity if not already in token
      if (token.email && !token.id) {
        const userIdObj = await sanityClient.fetch<{ _id: string } | null>(
          `*[_type == "user" && email == $email][0] {
            _id
          }`,
          { email: token.email }
        );
        if (userIdObj) {
          token.id = userIdObj._id;
        }
      }
      
      return token;
    },
    session: async ({ session, token }) => {
      // Send properties to the client
      if (token.id) {
        session.user.id = token.id as string;
      }
      
      // Fallback: fetch user ID if not in token
      if (!session.user.id && token.email) {
        const userIdObj = await sanityClient.fetch<{ _id: string } | null>(
          `*[_type == "user" && email == $email][0] {
            _id
          }`,
          { email: token.email }
        );
        if (userIdObj) {
          session.user.id = userIdObj._id;
        }
      }
      
      return session;
    },
  },
};
