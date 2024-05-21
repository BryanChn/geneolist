import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export const Cards = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">test</p>
                    <small className="text-default-500">test</small>
                    <h4 className="font-bold text-large">Recherche</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="https://nextui.org/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
        </div>
    );
};
