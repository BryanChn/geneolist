import React, { useEffect, useState } from "react";
import { Tabs, Tab, Switch, Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TablesUsers } from "./tableUsers";

interface createDeath {
    name: String;
    lastName: String;
    town: String;
    country: String;
    sexe: String;
    parents: String;
    marriedName: String;
    dateBirth: Date;
    dateDeath: Date;
}

export const MainTabs = () => {
    const [isVertical, setIsVertical] = useState(true);
    const [showUsers, setShowUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<createDeath>();

    const creatDeath = async (data: createDeath) => {
        try {
            const response = await fetch("/api/death", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                toast.success("Décès ajouté");
                reset();
            } else {
                const errorData = await response.json();
                console.error("Failed to create death:", errorData);
                toast.error("Ajout du décès échoué");
            }
        } catch (error) {
            console.error("Failed to create death:", error);
            toast.error("Ajout du décès échoué");
        }
    };

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const response = await fetch("/api/users", {
                method: "GET",
            });

            if (response.ok) {
                const users = await response.json();
                setShowUsers(users);
                setUsersLoaded(true);
                console.log(users);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        if (!usersLoaded) {
            fetchUsers();
        }
    }, [usersLoaded]);

    const onSubmit = (data: createDeath) => {
        creatDeath(data);
    };

    return (
        <div className="flex flex-col px-4">
            <Switch
                className="mb-4"
                isSelected={isVertical}
                onValueChange={setIsVertical}
            >
                Vertical
            </Switch>
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options" isVertical={isVertical}>
                    <Tab key="décès" title="Ajout d'un décès">
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Input
                                isRequired
                                label="Nom"
                                placeholder="Entrez le nom de famille"
                                type="text"
                                {...register("lastName")}
                                required
                            />
                            {errors.lastName && (
                                <p style={{ color: "red" }}>
                                    Ce champ est requis
                                </p>
                            )}

                            <Input
                                isRequired
                                label="Prénom"
                                placeholder="Entrez le prénom"
                                type="text"
                                {...register("name")}
                                required
                            />
                            {errors.name && (
                                <p style={{ color: "red" }}>
                                    Ce champ est requis
                                </p>
                            )}

                            <Input
                                isRequired
                                label="ville"
                                placeholder="Entrez la ville"
                                type="text"
                                {...register("town")}
                                required
                            />
                            {errors.town && (
                                <p style={{ color: "red" }}>
                                    Ce champ est requis
                                </p>
                            )}
                            <Input
                                isRequired
                                label="Pays"
                                placeholder="Entrez le pays"
                                type="text"
                                {...register("country")}
                                required
                            />
                            {errors.country && (
                                <p style={{ color: "red" }}>
                                    Ce champ est requis
                                </p>
                            )}

                            <Input
                                type="radio"
                                value="Homme"
                                {...register("sexe")}
                                label="Homme"
                            />
                            <Input
                                type="radio"
                                value="Femme"
                                {...register("sexe")}
                                label="Femme"
                            />

                            <Input
                                isRequired
                                label="Parents"
                                placeholder="Entrez le nom des parents"
                                type="text"
                                {...register("parents")}
                                required
                            />
                            {errors.parents && (
                                <p style={{ color: "red" }}>
                                    Ce champ est requis
                                </p>
                            )}
                            <Input
                                isRequired
                                label="Nom de mariée"
                                placeholder="Entrez le nom de mariée"
                                type="text"
                                {...register("marriedName")}
                                required
                            />
                            {errors.marriedName && (
                                <p style={{ color: "red" }}>
                                    Ce champ est requis
                                </p>
                            )}

                            <Input
                                isRequired
                                label="Date de naissance"
                                placeholder="Entrez la date de naissance"
                                type="date"
                                {...register("dateBirth")}
                            />
                            <Input
                                isRequired
                                label="Date de décès"
                                placeholder="Entrez la date de décès"
                                type="date"
                                {...register("dateDeath")}
                            />

                            <Button color="success" type="submit">
                                Enregistrer
                            </Button>
                        </form>
                    </Tab>
                    <Tab key="Users" title="Utilisateurs" onClick={fetchUsers}>
                        {loadingUsers ? (
                            <p>Loading...</p>
                        ) : (
                            <TablesUsers data={showUsers} />
                        )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};
