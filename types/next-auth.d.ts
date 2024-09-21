// next-auth.d.ts (or inside types/ folder)
import NextAuth from "next-auth";

// Extend Session type
declare module "next-auth" {
  interface Session {
    id: string;
    verification_level: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    verification_level: string;
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    verification_level: string;
  }
}

