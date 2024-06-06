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
import { usePathname, useRouter } from "next/navigation";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");
    const { data: session, status } = useSession();
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
    const isActive = (path: string) => pathname === path;

    // const menuItems = ["Profile", "Dashboard", "Log Out"];

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            className="bg-gradient-to-r from-emerald-400 from-10% to-white-400 to-90% rounded-lg shadow-2xl"
        >
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold text-inherit text-white text-2xl font-mono">
                        Geneoliste
                    </p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem
                    isActive={activeItem === "acceuil"}
                    style={{ color: "primary" }}
                >
                    <Link
                        className={`${
                            isActive("/")
                                ? "text-primary font-bold"
                                : "text-white"
                        } font-bold text-lg font-mono`}
                        href="/"
                        onClick={() => handleItemClick("/")}
                    >
                        Accueil
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeItem === "Pays"}>
                    <Link
                        className={`${
                            isActive("/country")
                                ? "text-primary font-bold"
                                : "text-white"
                        } font-bold text-lg font-mono`}
                        href="/country"
                        onClick={() => handleItemClick("/country")}
                    >
                        Pays
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeItem === "Demande de recherche"}>
                    {/* <Link
                        href="#"
                        color="foreground"
                        onClick={() => handleItemClick("Demande de recherche")}
                    >
                        Demande de recherche
                    </Link> */}
                </NavbarItem>
                {isAdmin && (
                    <NavbarItem>
                        <Link
                            className={`${
                                isActive("/admin")
                                    ? "text-primary font-bold"
                                    : "text-white"
                            } font-bold text-lg font-mono`}
                            href="/admin"
                            onClick={() => handleItemClick("/admin")}
                        >
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
