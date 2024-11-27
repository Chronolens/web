"use client";

import { MainLogo } from "@/components/MainLogo";
import { StyledInput } from "@/components/StyledInput";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-primary">
      <div className="flex-col w-auto">
        <MainLogo />
        <SignUpForm />
      </div>
    </div>
  );
}

function SignUpForm() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center mt-36">
      <div className="max-w-60">
        <form
          // action={async (formData: FormData) => {
          //   try {
          //     // fetchSignUp(formData);
          //     redirect("/login");
          //   } catch (error) {
          //     console.error("Error signing up:", error);
          //   }
          // }}
          className="space-y-6"
        >
          <StyledInput
            id="email"
            name="email"
            placeholder="E-mail"
            type="text"
            autoComplete="e-mail"
          />

          <StyledInput
            id="server"
            name="server"
            placeholder="Server Address"
            type="text"
            autoComplete="server"
          />
          <StyledInput
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            autoComplete="username"
          />

          <StyledInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />

          <input
            type="submit"
            value="Sign Up"
            className="transition duration-300 flex w-full justify-center rounded-sm bg-foreground px-2 py-2 text-sm font-semibold leading-6 text-background hover:ease-in-out hover:bg-gray-400"
          />
          <button
            onClick={() => router.push("/login")}
            type="button"
            className="font-medium text-xs w-full justify-center"
          >
            Log In Instead
          </button>
        </form>
      </div>
    </div>
  );
}
