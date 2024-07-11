import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";

interface Users {
    id: string;
    name: string;
    lastName: string;
    email: string;
    subscription: string;
}

export const TablesUsers = ({ data }: { data: Users[] }) => {
    return (
        <div className="flex flex-col gap-3">
            <Table
                color="success"
                selectionMode="single"
                defaultSelectedKeys={["2"]}
                aria-label="Example table with dynamic content"
            >
                <TableHeader>
                    <TableColumn>Nom</TableColumn>
                    <TableColumn>Prénom</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Subscription</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.subscription}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
