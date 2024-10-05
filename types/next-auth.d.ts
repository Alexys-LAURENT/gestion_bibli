// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id_user:string
      firstname: string
      lastname: string
      birthdate: string
      address: string
      zip: string
      city: string
      country: string
      is_admin: boolean
    } & DefaultSession["user"]
  }
}