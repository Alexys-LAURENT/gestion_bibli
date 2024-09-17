/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from '@/lib/db';
// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const config = {
	// pages: {
	// 	signIn: '/login',
	// },
	session: {
		strategy: 'jwt',
		// 15 days
		// maxAge: 15 * 24 * 60 * 60,
	},
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email@exemple.com' },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, _) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.users.findFirst({
          where: {
            mail: credentials?.email,
          },
        });
        if (!user) {
          return null;
        }

        const isValid = bcrypt.compareSync(credentials?.password, user.password);

        // If no error and we have user data, return it
        if (isValid) {
          return { id: user.id_user.toString(), email: user.mail ,
            name: user.firstname + ' ' + user.lastname,
            firstname: user.firstname,
            lastname: user.lastname,
            birth_date: user.birth_date,
            address: user.address,
            zip: user.zip,
            city: user.city,
            country: user.country,
            id_admin: user.is_admin,
          } as unknown as User;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
				token = {
					...token,
					id_admin: (user as unknown as any).id_admin,
          firstname: (user as unknown as any).firstname,
          lastname: (user as unknown as any).lastname,
          birth_date: (user as unknown as any).birth_date,
          address: (user as unknown as any).address,
          zip: (user as unknown as any).zip,
          city: (user as unknown as any).city,
          country: (user as unknown as any).country,
          id_user: (user as unknown as any).id,
				};
			}
			return token;
    },
    async session({ session, token }) {
			if (token) {
				(session as any).user = { ...session.user, id_admin: token.id_admin,
        firstname: token.firstname,
        lastname: token.lastname,
        birth_date: token.birth_date,
        address: token.address,
        zip: token.zip,
        city: token.city,
        country: token.country,
        id_user: token.id_user,
      };
			}

			return session;
		},
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
