"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    RadioGroup,
    Radio,
} from "@nextui-org/react";

const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
];

interface DeathData {
    id: string;
    name: string;
    lastName: string;
    dateDeath: string;
    dateBirth: string;
    country: string;
    town: string;
    sexe: string;
    parents: string;
    marriedName: string;
}

export const TablesDeath = ({ data }: { data: DeathData[] }) => {
    return (
        <div className="flex flex-col gap-3">
            <Table
                color="success"
                selectionMode="single"
                defaultSelectedKeys={["2"]}
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>Nom</TableColumn>
                    <TableColumn>Prénom</TableColumn>
                    <TableColumn>Date décès</TableColumn>
                    <TableColumn>Date de naissance</TableColumn>
                    <TableColumn>Pays</TableColumn>
                    <TableColumn>Ville</TableColumn>
                    <TableColumn>Sexe</TableColumn>
                    <TableColumn>Parents</TableColumn>
                    <TableColumn>Nom du marie/mariée</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((death) => (
                        <TableRow key={death.id}>
                            <TableCell>{death.name}</TableCell>
                            <TableCell>{death.lastName}</TableCell>
                            <TableCell>
                                {new Date(death.dateDeath).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(death.dateBirth).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{death.country}</TableCell>
                            <TableCell>{death.town}</TableCell>
                            <TableCell>{death.sexe}</TableCell>
                            <TableCell>{death.parents}</TableCell>
                            <TableCell>{death.marriedName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
