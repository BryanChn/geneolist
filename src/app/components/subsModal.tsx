import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Radio,
    RadioGroup,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface SubsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Subscription {
    name: string;
    firstName: string;
    birthDate: string;
    birthPlace: string;
    country: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
    donationChoice: string;
    paymentMethod: string;
}

export const SubsModal = ({ isOpen, onClose }: SubsModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Subscription>();

    const handleSubmitSubscription = async (data: Subscription) => {
        console.log("Form data submitted: ", data);
    };

    const onSubmit = async (data: Subscription) => {
        handleSubmitSubscription(data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            className="m-4 max-w-lg rounded-lg shadow-lg overflow-auto"
        >
            <ModalContent className="relative bg-white rounded-lg shadow-lg max-h-[90vh] max-w-lg w-full">
                <ModalHeader className="text-center">
                    Demande d&apos;abonnement
                </ModalHeader>
                <ModalBody className="space-y-4 p-6 overflow-y-auto">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Input
                                label="Nom"
                                {...register("name", {
                                    required: "Le nom est requis.",
                                })}
                                placeholder="Entrez votre nom"
                                fullWidth
                                className={errors.name && "border-red-500"}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Prénom"
                                {...register("firstName", {
                                    required: "Le prénom est requis.",
                                })}
                                placeholder="Entrez votre prénom"
                                fullWidth
                                className={errors.firstName && "border-red-500"}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Date de naissance"
                                {...register("birthDate", {
                                    required:
                                        "La date de naissance est requise.",
                                })}
                                type="date"
                                fullWidth
                                className={errors.birthDate && "border-red-500"}
                            />
                            {errors.birthDate && (
                                <p className="text-red-500 text-sm">
                                    {errors.birthDate.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Lieu de naissance"
                                {...register("birthPlace", {
                                    required:
                                        "Le lieu de naissance est requis.",
                                })}
                                placeholder="Entrez votre lieu de naissance"
                                fullWidth
                                className={
                                    errors.birthPlace && "border-red-500"
                                }
                            />
                            {errors.birthPlace && (
                                <p className="text-red-500 text-sm">
                                    {errors.birthPlace.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Pays"
                                {...register("country", {
                                    required: "Le pays est requis.",
                                })}
                                placeholder="Entrez votre pays"
                                fullWidth
                                className={errors.country && "border-red-500"}
                            />
                            {errors.country && (
                                <p className="text-red-500 text-sm">
                                    {errors.country.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Adresse"
                                {...register("address", {
                                    required: "L'adresse est requise.",
                                })}
                                placeholder="Entrez votre adresse"
                                fullWidth
                                className={errors.address && "border-red-500"}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Code postal"
                                {...register("postalCode", {
                                    required: "Le code postal est requis.",
                                })}
                                placeholder="Entrez votre code postal"
                                fullWidth
                                className={
                                    errors.postalCode && "border-red-500"
                                }
                            />
                            {errors.postalCode && (
                                <p className="text-red-500 text-sm">
                                    {errors.postalCode.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Ville"
                                {...register("city", {
                                    required: "La ville est requise.",
                                })}
                                placeholder="Entrez votre ville"
                                fullWidth
                                className={errors.city && "border-red-500"}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Téléphone"
                                {...register("phone")}
                                placeholder="Entrez votre téléphone"
                                fullWidth
                            />
                        </div>

                        <div className="space-y-2">
                            <Input
                                label="Email"
                                {...register("email", {
                                    required: "L'email est requis.",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "l'adresse email est invalide",
                                    },
                                })}
                                type="email"
                                placeholder="Entrez votre email"
                                fullWidth
                                className={errors.email && "border-red-500"}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg font-semibold">
                                Choix abonnement
                            </p>
                            <RadioGroup
                                orientation="vertical"
                                {...register("donationChoice", {
                                    required:
                                        "Le choix d'abonnement est requis.",
                                })}
                                className="space-y-2"
                            >
                                <Radio
                                    value="don_unique"
                                    className="font-medium"
                                >
                                    Don unique
                                </Radio>
                                <Radio value="annuelle" className="font-medium">
                                    30€ l&apos;année
                                </Radio>
                                <Radio value="spé1" className="font-medium">
                                    Entretien spécialisé d&apos;un caveau de 1
                                    mètre : 10€
                                </Radio>
                                <Radio value="spé2" className="font-medium">
                                    Entretien spécialisé d&apos;un caveau de 2
                                    mètres ou d&apos;une chapelle : 20€
                                </Radio>
                            </RadioGroup>
                            {errors.donationChoice && (
                                <p className="text-red-500 text-sm">
                                    {errors.donationChoice.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-lg font-semibold">
                                Méthode de payement
                            </p>
                            <RadioGroup
                                orientation="vertical"
                                {...register("paymentMethod", {
                                    required:
                                        "La méthode de paiement est requise.",
                                })}
                                className="space-y-2"
                            >
                                <Radio value="cheque" className="font-medium">
                                    Chèque
                                </Radio>
                                <Radio value="virement" className="font-medium">
                                    Virement bancaire
                                </Radio>
                            </RadioGroup>
                            {errors.paymentMethod && (
                                <p className="text-red-500 text-sm">
                                    {errors.paymentMethod.message}
                                </p>
                            )}
                        </div>

                        <Button color="success" type="submit" fullWidth>
                            Envoyer la demande
                        </Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        color="secondary"
                        as="a"
                        href="/inscription.pdf"
                        target="_blank"
                        download
                    >
                        Télécharger le formulaire PDF
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
