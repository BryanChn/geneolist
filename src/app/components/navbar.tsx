"use client";
import React, { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@nextui-org/react";
import ModalSignUp from "./modalSignUp";
import ModalSignIn from "./ModalSignIn";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("");

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    const menuItems = ["Profile", "Dashboard", "Log Out"];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
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
                <NavbarItem isActive={activeItem === "Annonces"}>
                    <Link
                        color="foreground"
                        href="#"
                        onClick={() => handleItemClick("Annonces")}
                    >
                        Annonces
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>

                <NavbarItem>
                    <ModalSignIn />
                </NavbarItem>
                <NavbarItem>
                    <ModalSignUp />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="max-w-sm mx-auto">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
