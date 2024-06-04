"use client";
import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";
import ModalSignUp from "./modalSignUp";
import ModalSignIn from "./ModalSignIn";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "ADMIN") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [session, status]);

    const handleSingout = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    const menuItems = ["Profile", "Dashboard", "Log Out"];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold text-inherit">Geneoliste</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem
                    isActive={activeItem === "acceuil"}
                    style={{ color: "primary" }}
                >
                    <Link
                        color="foreground"
                        href="/"
                        onClick={() => setActiveItem("acceuil")}
                    >
                        Accueil
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeItem === "Pays"}>
                    <Link
                        color="foreground"
                        href="/country"
                        onClick={() => handleItemClick("Pays")}
                    >
                        Pays
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeItem === "Demande de recherche"}>
                    <Link
                        href="#"
                        color="foreground"
                        onClick={() => handleItemClick("Demande de recherche")}
                    >
                        Demande de recherche
                    </Link>
                </NavbarItem>
                {isAdmin && (
                    <NavbarItem>
                        <Link color="foreground" href="/admin">
                            Administration
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>
            <NavbarContent justify="end">
                {session ? (
                    <>
                        <NavbarItem>
                            {session && session.user && (
                                <p>Bonjour, {session.user.name}</p>
                            )}
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={handleSingout}
                            >
                                Déconnexion
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <NavbarItem>
                            <ModalSignIn />
                        </NavbarItem>
                        <NavbarItem>
                            <ModalSignUp />
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </Navbar>
    );
};
