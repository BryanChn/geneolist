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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{country}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Link href={`/death?country=${country}`}>
                        <Image
                            alt={`${country} flag`}
                            className="object-cover rounded-xl"
                            src={imageUrl}
                            width={270}
                        />
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
};
