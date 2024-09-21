import NextAuth, { NextAuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

// Define custom user type
interface CustomUser {
  sub: string;  // Worldcoin uses 'sub' for user ID
  name: string;
  email: string;
  "https://id.worldcoin.org/v1": {
    verification_level: string;
  };
}

// Worldcoin provider setup
const WorldcoinProvider: OAuthConfig<CustomUser> = {
  id: "worldcoin",
  name: "Worldcoin",
  type: "oauth",
  version: "2.0",
  authorization: {
    url: "https://id.worldcoin.org/authorize",
    params: { scope: "openid profile email" }, // Params belong here
  },
  token: "https://id.worldcoin.org/token",
  userinfo: "https://id.worldcoin.org/userinfo",
  profile(profile) {
    return {
      id: profile.sub,  // Using 'sub' from Worldcoin profile as the ID
      name: profile.name,
      email: profile.email,
      image: null, // No image provided by Worldcoin
      verification_level: profile["https://id.worldcoin.org/v1"].verification_level, // Accessing dynamic field
    };
  },
};

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [WorldcoinProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.verification_level = user.verification_level;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.verification_level = token.verification_level;
      return session;
    },
  },
};

// Export the handler for NextAuth.js
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
