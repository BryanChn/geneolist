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
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { MailIcon } from "@/styles/icon/mails";
import { LockIcon } from "@/styles/icon/lock";

interface LogInUser {
    email: string;
    password: string;
}

export default function ModalSignIn() {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInUser>();

    const loginUser = async (data: LogInUser) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Connexion réussie");
                console.log(data);
                closeModal();
            }
        } catch (error) {
            console.error("Failed to login", error);
            toast.error("Connexion échouée");
        }
    };

    const onSubmit = (data: LogInUser) => {
        loginUser(data);
    };

    return (
        <>
            <Button onPress={openModal} color="primary" variant="flat">
                Connectez-vous
            </Button>
            <Modal isOpen={isOpen} onClose={closeModal} placement="top-center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        Connexion
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Input
                                autoFocus
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                                {...register("email", {
                                    required: "L'email est requis",
                                })}
                                type="email"
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                variant="bordered"
                                {...register("password", {
                                    required: "Le mot de passe est requis",
                                })}
                                errorMessage={errors.password?.message}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={closeModal}
                            >
                                Fermer
                            </Button>
                            <Button color="success" type="submit">
                                Connexion
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
