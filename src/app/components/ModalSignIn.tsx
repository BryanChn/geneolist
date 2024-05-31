"use client";
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
    Input,
    Link,
} from "@nextui-org/react";
import { MailIcon } from "@/styles/icon/mails";
import { LockIcon } from "@/styles/icon/lock";

export default function ModalSignIn() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
                    <ModalBody>
                        <Input
                            autoFocus
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                        />
                        <Input
                            endContent={
                                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            variant="bordered"
                        />
                        {/* <div className="flex py-2 px-1 justify-between">
                            <Checkbox
                                classNames={{
                                    label: "text-small",
                                }}
                            >
                                Remember me
                            </Checkbox>
                            <Link color="primary" href="#" size="sm">
                                Forgot password?
                            </Link>
                        </div> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            variant="flat"
                            onPress={closeModal}
                        >
                            Fermer
                        </Button>
                        <Button color="success" onPress={closeModal}>
                            Connexion
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
