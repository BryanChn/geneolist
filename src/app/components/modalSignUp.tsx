"use client";
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Link,
    colors,
} from "@nextui-org/react";
import { MailIcon } from "@/styles/icon/mails";
import { LockIcon } from "@/styles/icon/lock";
import { UsersIcon } from "@/styles/icon/users";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { color } from "framer-motion";

interface CreateUser {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export default function ModalSignUp() {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUser>();

    const createUser = async (data: CreateUser) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const user = await response.json();
                console.log(user);
                toast.success("Inscription réussie");

                closeModal();
            } else {
                console.error("Failed to create user");
                toast.error("Inscription échouée");
            }
        } catch (error) {
            console.error("Failed to create user", error);
            toast.error("Inscription échouée");
        }
    };

    const onSubmit = (data: CreateUser) => {
        createUser(data);
    };

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />
            <Button onPress={openModal} color="primary">
                Inscrivez-vous
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal} placement="top-center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Inscription
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                endContent={
                                    <UsersIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Nom"
                                placeholder="Entrer votre nom"
                                type="text"
                                variant="bordered"
                                {...register("name", { required: true })}
                                required
                            />
                            {errors.name && (
                                <p style={{ color: "red" }}>
                                    Votre nom est requis
                                </p>
                            )}
                            <Input
                                endContent={
                                    <UsersIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Prénom"
                                placeholder="Entrer votre Prénom"
                                type="text"
                                variant="bordered"
                                {...register("lastName", { required: true })}
                            />
                            {errors.lastName && (
                                <p style={{ color: "red" }}>
                                    Votre prénom est requis
                                </p>
                            )}
                            <Input
                                autoFocus
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                placeholder="Entrer votre email"
                                variant="bordered"
                                {...register("email", {
                                    required: "l'adresse email est requise",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "l'adresse email est invalide",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p style={{ color: "red" }}>
                                    {errors.email.message}
                                </p>
                            )}

                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Mot de passe"
                                placeholder="Entrer votre mot de passe"
                                type="password"
                                variant="bordered"
                                {...register("password", { required: true })}
                            />
                            {errors.password && (
                                <p style={{ color: "red" }}>
                                    Votre mot de passe est requis
                                </p>
                            )}
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={closeModal}
                                >
                                    Fermer
                                </Button>
                                <Button color="success" type="submit">
                                    Enregistrer
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
