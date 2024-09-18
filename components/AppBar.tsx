"use client";

import { useEffect, useState } from "react";
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
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Spinner,
} from "@nextui-org/react";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AppBar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const menuItems = ["Profile", "Dashboard", "Log Out"];

  function handleSignin() {
    setLoading(true);
    signIn("google");
  }

  useEffect(() => {
    setLoading(false);
  }, [session]);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-[#0a0a0a]">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit text-lg">CoSnippet</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          <>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    showFallback
                    color="secondary"
                    size="sm"
                    src={
                      session.user?.image ||
                      "https://images.unsplash.com/broken"
                    }
                  />
                </DropdownTrigger>
                
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem className="h-14 gap-2" textValue="user email">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem
                    color="danger"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button
              onClick={handleSignin}
              color="primary"
              variant="flat"
              className={`flex items-center gap-2 ${loading ? "cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#ffc107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                    ></path>
                    <path
                      fill="#ff3d00"
                      d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                    ></path>
                    <path
                      fill="#1976d2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                    ></path>
                  </svg>
                  Sign In
                </>
              )}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link
              className="w-full text-white"
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
}
