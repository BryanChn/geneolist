"use client";
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

export const Cards = ({
    country,
    imageUrl,
}: {
    country: string;
    imageUrl: string;
}) => {
    return (
        <div
            className="mt-10
         flex flex-col items-center justify-center"
        >
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large text-emerald-500">
                        {country}
                    </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Link href={`/death?country=${country}`}>
                        <Image
                            alt={`${country} flag`}
                            className="object-cover rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                            src={imageUrl}
                            width={270}
                        />
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
};
