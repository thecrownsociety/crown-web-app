import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  }
}
