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
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAppContext } from "@/utils/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AppBar() {
  const { data: session } = useSession();
  const { user, setUser } = useAppContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const menuItems = ["Profile", "Log Out"];
  const router = useRouter();

  function handleSignin() {
    setLoading(true);
    signIn("google");
  }

  const setUserData = async (email: string) => {
    const username = email.split("@")[0];
    const res = await fetch("/api/user/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (res) {
      const data = await res.json();
      setUser({
        uid: data.id,
        email: data.email,
        username: data.username,
        nickname: data.nickname,
        picture: data.picture,
        createdAt: data.createdAt,
      });
    }
  };

  useEffect(() => {
    if (session?.user?.email && user.email === "") {
      setUserData(session.user.email);
    }

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
          <Link href={"/"} className="font-bold text-inherit text-lg">
            CoSnippet
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}
      <NavbarContent justify="end">
        {session ? (
          <>
            <Tooltip
              placement={"bottom"}
              content={"Create Snippet"}
              color="default"
              size="sm"
            >
              <Link
                href={"/create"}
                className="hover:bg-gray-900 rounded-md p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                  ></path>
                </svg>
              </Link>
            </Tooltip>
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Image
                    alt="User Picture"
                    src={
                      session.user?.image ||
                      ""
                    }
                    width={40}
                    height={40}
                    className="transition-transform w-8 h-8 rounded-full cursor-pointer select-none"
                  />
                </DropdownTrigger>

                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem className="h-14 gap-2" textValue="user email">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem onClick={()=> router.push(`/${user.username}`)}>Profile</DropdownItem>
                  <DropdownItem color="danger" onClick={() => signOut()}>
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
              className={`flex items-center gap-2 ${
                loading ? "cursor-not-allowed" : ""
              }`}
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
            <Link className="w-full text-white" href="/">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
