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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                lastName: lastName,
                password: hashedPassword,
                role: "USER",
                subscription: "FREE",
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

export async function PATCH(req: NextRequest) {
    try {
        const { id, subscription } = await req.json();

        if (!["FREE", "SUBSCRIBED"].includes(subscription)) {
            return NextResponse.json(
                { error: "Type d'abonnement invalide" },
                { status: 400 }
            );
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: { subscription: subscription },
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'abonnement:", error);
        return NextResponse.json(
            { error: "Erreur lors de la mise à jour de l'abonnement" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany({});

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des utilisateurs:",
            error
        );
        return NextResponse.json(
            { error: "Erreur lors de la récupération des utilisateurs" },
            { status: 500 }
        );
    }
}
