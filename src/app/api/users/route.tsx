import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, lastName, password } = body;

        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Un utilisateur avec cet email existe déjà" },
                { status: 400 }
            );
        }

        const freeSubscription = await prisma.subscription.findUnique({
            where: { name: "free" },
        });

        if (!freeSubscription) {
            return NextResponse.json(
                { error: 'Abonnement par défaut "free" non trouvé' },
                { status: 500 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                lastName: lastName,
                password: hashedPassword,
                role: "USER",
                subscriptionId: freeSubscription.id,
            },
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création de l'utilisateur" },
            { status: 500 }
        );
    }
}
