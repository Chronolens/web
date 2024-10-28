"use client"; // Ensure this is a Client Component

import { useRouter } from "next/navigation";
import { Logo, StyledInput } from "../login/page"; // Import Logo from the login page
// import { fetchSignUp } from "../lib/network/network";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-t from-black to-purple-bg">
      <div className="flex-col space-y-36 w-auto">
        <Logo /> {/* Use Logo here */}
        <SignUpForm />
      </div>
    </div>
  );
}


function SignUpForm() {
  const router = useRouter();

  return ( // Add this line
    <div className="flex w-full items-center justify-center">
      <div className="max-w-60">
        <form
          action={async (formData: FormData) => {
            try {
              // fetchSignUp(formData);
              router.push("/login");
            } catch (error) {
              console.error("Error signing up:", error);
            }
          }}
          className="space-y-6"
        >
          <div>
            <div className="mt-2">
              <StyledInput
                id="email"
                name="email"
                placeholder="E-mail"
                type="text"
                autoComplete="e-mail"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <StyledInput
                id="server"
                name="server"
                placeholder="Server Address"
                type="text"
                autoComplete="server"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <StyledInput
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <StyledInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
          </div>

          <input
            type="submit"
            value="Sign Up"
            className="transition duration-300 flex w-full justify-center rounded-sm bg-foreground px-2 py-2 text-sm font-semibold leading-6 text-background hover:ease-in-out hover:bg-gray-400"
          />
        </form>
        <button
          onClick={() => router.push("/login")}
          type="button"
          className="font-medium text-xs w-full justify-center"
        >
          Log In Instead
        </button>
      </div>
    </div>
  );
}