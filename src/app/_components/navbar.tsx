import React from "react";
import {Navbar as NextuiNavbar, NavbarBrand, NavbarContent, Link, Button} from "@nextui-org/react";
import NavbarItem from "~/app/_components/navbarItem";

export default function Navbar() {
    return (
        <NextuiNavbar>
            <NavbarBrand>
                <Link href="/" className={'text-inherit\t'}>
                    <p className="font-bold text-inherit">Wybierajka imion</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem href="/selector/women">
                        Imiona żeńskie
                </NavbarItem>
                <NavbarItem href="/selector/men">
                        Imiona męskie
                </NavbarItem>
            </NavbarContent>
            <NavbarContent>
                <NextuiNavbar className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NextuiNavbar>
                <NextuiNavbar>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NextuiNavbar>
            </NavbarContent>
        </NextuiNavbar>
    )
}