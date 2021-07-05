import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId:'449670051451-93cohv6fdoskvkq020fvbdsjok8bkgta.apps.googleusercontent.com',
      clientSecret:'pFvVsfUumZdnsVKS0Jy7d-HZ'
    }),
    // ...add more providers here
  ],
})