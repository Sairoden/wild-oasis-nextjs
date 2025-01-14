declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      guestId?: string;
    };
  }
}
