"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { links } from "@/lib/info";
import UserLinks from "./userlinks";
import LoginModal from "../modals/login";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="px-6 w-full h-[60px] flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="text-xl flex justify-center items-center">
        <p className="text-xl font-bold">Terra</p>
        <p className="ml-[2px] font-bold text-primary -my-1">Zure</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        {links.map((l, i) => (
          <Link
            key={i}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            href={l.href}
          >
            {l.label}
          </Link>
        ))}
        {session?.user ? (
          <UserLinks user={session.user} />
        ) : (
          <LoginModal title="signIn" />
        )}
      </div>
    </div>
  );
}
