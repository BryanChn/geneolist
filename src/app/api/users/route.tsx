import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { email, name, lastName, password } = body;

    const freeSubscription = await prisma.subscription.findUnique({
        where: { name: "free" },
    });

    if (!freeSubscription) {
        return NextResponse.json(
            { error: 'Default subscription "free" not found' },
            { status: 500 }
        );
    }

    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            lastName: lastName,
            password: password,
            role: "USER",
            subscriptionId: freeSubscription.id, // Default subscription
        },
    });

    return NextResponse.json(newUser, { status: 201 });
}
