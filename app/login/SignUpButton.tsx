"use client";
import { useRouter } from "next/navigation";

export function SignUpButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/signup")}
      type="button"
      className="font-medium text-xs w-full justify-center"
    >
      Sign Up Instead
    </button>
  );
}
