import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  pages: {
      signIn: "/auth/signin"
  },
  callbacks:{
    async session({session, token, user}){
      session.user.username = session.user.name.replace(' ','').toLocaleLowerCase()
      session.user.firstname = session.user.name.split(' ')[0]
      session.user.uid = token.sub
      return session
    }
  }
}
export default NextAuth(authOptions)