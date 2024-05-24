import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const {
        name,
        lastName,
        dateDeath,
        dateBirth,
        town,
        country,
        sexe,
        parents,
        marriedName,
    } = body;
    const dateDeathObj = parseDate(dateDeath);
    const dateBirthObj = parseDate(dateBirth);

    const newDeath = await prisma.death.create({
        data: {
            name: name,
            lastName: lastName,
            dateDeath: dateDeathObj,
            dateBirth: dateBirthObj,
            town: town,
            country: country,
            sexe: sexe,
            parents: parents,
            marriedName: marriedName,
        },
    });
    return NextResponse.json(newDeath, { status: 201 });
}
function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
}
