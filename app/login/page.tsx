"use client"; // Ensure this is a Client Component

import { useRouter } from "next/navigation";
import { fetchSignIn } from "../lib/network/network";
export const dynamic = "force-dynamic";

export default function LoginPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-t from-black to-purple-bg">
      <div className="flex-col space-y-36 w-auto">
        <Logo />
        <LoginForm />
      </div>
    </div>
  );
}
function Logo() {
  return (
    <div className="flex-col text-center items-center justify-center">
      <h1 className="text-6xl">ChronoLens</h1>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="max-w-60">
        <form
          action={async (formData: FormData) => {
            try {
              fetchSignIn(formData);
              router.push("/gallery");
            } catch (error) {
              console.error("Error signing in:", error);
            }
          }}
          className="space-y-6"
        >
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
            <div className="flex mt-3 w-full justify-end">
              <div className="text-xs">
                <a
                  // TODO: href="#"
                  className="font-semibold text-violet-500 hover:text-violet-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Log In"
            className="transition duration-300 flex w-full justify-center rounded-sm bg-foreground px-2 py-2 text-sm font-semibold leading-6 text-background hover:ease-in-out hover:bg-gray-400"
          />
        </form>
        <button
          onClick={() => router.push("/signup")}
          type="button"
          className="font-medium text-xs w-full justify-center"
        >
          Sign Up Instead
        </button>
      </div>
    </div>
  );
}

export function StyledInput(props) {
  return (
    <input
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      autoComplete={props.autoComplete}
      required
      className="block bg-transparent w-full transition duration-300 ease-in-out border-0 border-b border-gray-500 py-2 text-white focus:ring-0 focus:border-white focus:ease-in-out"
    />
  );
}
