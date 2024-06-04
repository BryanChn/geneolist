import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
interface Credentials {
    email: string;
    password: string;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Credentials | undefined) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("Adresse e-mail incorrecte");
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Mot de passe incorrect");
                }

                return {
                    ...user,
                    id: user.id.toString(),
                };
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user = token;
                session.userId = token.id;
                session.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
};
