"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      className="bg-red-light px-12 py-3 rounded-lg text-foreground"
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </button>
  );
}
