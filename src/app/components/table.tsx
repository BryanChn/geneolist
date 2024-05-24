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

export default function Tables() {
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
                    <TableColumn>Ville</TableColumn>
                    <TableColumn>Sexe</TableColumn>
                    <TableColumn>Parents</TableColumn>
                    <TableColumn>Nom du marie/mariée</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>William </TableCell>
                        <TableCell>Howard</TableCell>
                        <TableCell>12/05/2024</TableCell>
                        <TableCell>10/02/1985</TableCell>
                        <TableCell>Mulhouse</TableCell>
                        <TableCell>Homme</TableCell>
                        <TableCell>Nicola Howard</TableCell>
                        <TableCell>Isabelle rougie</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>William </TableCell>
                        <TableCell>Howard</TableCell>
                        <TableCell>12/05/2024</TableCell>
                        <TableCell>10/02/1985</TableCell>
                        <TableCell>Mulhouse</TableCell>
                        <TableCell>Homme</TableCell>
                        <TableCell>Nicola Howard</TableCell>
                        <TableCell>Isabelle rougie</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>William </TableCell>
                        <TableCell>Howard</TableCell>
                        <TableCell>12/05/2024</TableCell>
                        <TableCell>10/02/1985</TableCell>
                        <TableCell>Mulhouse</TableCell>
                        <TableCell>Homme</TableCell>
                        <TableCell>Nicola Howard</TableCell>
                        <TableCell>Isabelle rougie</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>William </TableCell>
                        <TableCell>Howard</TableCell>
                        <TableCell>12/05/2024</TableCell>
                        <TableCell>10/02/1985</TableCell>
                        <TableCell>Mulhouse</TableCell>
                        <TableCell>Homme</TableCell>
                        <TableCell>Nicola Howard</TableCell>
                        <TableCell>Isabelle rougie</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
