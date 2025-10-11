"use client";
import Link from "next/link";
import React from "react";

import Logo from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/admin" },
];

function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/95">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link
          href={"/"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo height={40} width={40} />
          <span className="font-bold">StudyLMS</span>
        </Link>
        <nav className="ml-auto hidden md:flex md:flex-1 md:items-center md:justify-between md:pl-10">
          <div className="flex items-center gap-6 space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <>
                <UserDropdown
                  name={session.user.name}
                  email={session.user.email}
                  image={session.user.image || ""}
                />
              </>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className={buttonVariants({ variant: "default" })}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
