"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { SubsModal } from "./subsModal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

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
    town: string;
    sexe: string;
    parents: string;
    marriedName: string;
    country: string;
}

export const TablesDeath = ({ data }: { data: DeathData[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDeath, setSelectedDeath] = useState<DeathData | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [modalSubsOpen, setModalSubsOpen] = useState(false);

    const { data: session, status } = useSession();

    useEffect(() => {
        if (
            (status === "authenticated" && session?.user?.role === "ADMIN") ||
            (status === "authenticated" &&
                session?.user?.subscription === "SUBSCRIBED")
        ) {
            setIsSubscribed(true);
        } else {
            setIsSubscribed(false);
        }
    }, [session, status]);

    const hideText = (text: string) => {
        return text
            .split("")
            .map(() => "*")
            .join("");
    };

    const openModal = (death: DeathData) => {
        setSelectedDeath(death);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedDeath(null);
    };

    return (
        <div className="flex flex-col gap-3">
            <Table
                color="success"
                selectionMode="single"
                aria-label="Example static collection table"
            >
                <TableHeader>
                    <TableColumn>Nom</TableColumn>
                    <TableColumn>Prénom</TableColumn>
                    <TableColumn>Pays</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((death) => (
                        <TableRow
                            key={death.id}
                            onClick={() => openModal(death)}
                        >
                            <TableCell>{death.name}</TableCell>
                            <TableCell>{death.lastName}</TableCell>
                            <TableCell>{death.country}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedDeath && (
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    placement="top-center"
                >
                    <ModalContent>
                        <ModalHeader>
                            {selectedDeath.name} {selectedDeath.lastName}
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Date de naissance:{" "}
                                {isSubscribed
                                    ? new Date(
                                          selectedDeath.dateBirth
                                      ).toLocaleDateString()
                                    : hideText(
                                          new Date(
                                              selectedDeath.dateBirth
                                          ).toLocaleDateString()
                                      )}
                            </p>
                            <p>
                                Date de décès:{" "}
                                {new Date(
                                    selectedDeath.dateDeath
                                ).toLocaleDateString()}
                            </p>
                            <p>Pays: {selectedDeath.country}</p>
                            <p>
                                Ville:{" "}
                                {isSubscribed
                                    ? selectedDeath.town
                                    : hideText(selectedDeath.town)}
                            </p>
                            <p>Sexe: {selectedDeath.sexe}</p>
                            <p>
                                Parents:{" "}
                                {isSubscribed
                                    ? selectedDeath.parents
                                    : hideText(selectedDeath.parents)}
                            </p>
                            <p>
                                Nom du marié/mariée:{" "}
                                {isSubscribed
                                    ? selectedDeath.marriedName
                                    : hideText(selectedDeath.marriedName)}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={closeModal}
                            >
                                Fermer
                            </Button>

                            {!isSubscribed && (
                                <Button
                                    color="success"
                                    variant="flat"
                                    onPress={() => setModalSubsOpen(true)}
                                >
                                    Je m&apos;abonne !
                                </Button>
                            )}
                            <SubsModal
                                isOpen={modalSubsOpen}
                                onClose={() => setModalSubsOpen(false)}
                            />
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};
