import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { MainLogo } from "./MainLogo";
import { SignUpButton } from "./SignUpButton";
import { StyledInput } from "./StyledInput";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage(props: {
  searchParams: { callbackUrl: string | undefined; error: string | undefined };
}) {
  return (
    <div className=" w-screen h-screen flex items-center justify-center bg-gradient-primary">
      <div className="flex-col w-auto">
        <MainLogo />
        <LoginForm error={props.searchParams.error} />
      </div>
    </div>
  );
}

async function handleFormAction(formData: FormData) {
  "use server";
  formData.set("redirectTo", "/gallery");
  // TODO: set server address in the cookies or local storage
  // the address comes in the formData.get("serverAddress")
  const cookieStore = cookies();
  const serverAddress = formData.get("serverAddress")?.toString();
  if (serverAddress) {
    cookieStore.set("serverAddress", serverAddress);
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`/login?error=${error.type}`);
    }
    throw error;
  }
}
function LoginForm({ error }) {
  const serverAddress = cookies().get("serverAddress")?.value;
  return (
    <div className="flex w-full mt-36 items-center justify-center ">
      <div className="max-w-60">
        <form action={handleFormAction} className="space-y-6">
          <StyledInput
            id="serverAddress"
            name="serverAddress"
            placeholder="Server Address"
            defaultValue={serverAddress}
            type="text"
            autoComplete="url"
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
          {error ? (
            <div className="w-full text-center">
              <p className="text-red-500">Invalid Credentials</p>
            </div>
          ) : (
            <> </>
          )}

          <input
            type="submit"
            value="Log In"
            className="transition duration-300 flex w-full justify-center rounded-sm bg-foreground px-2 py-2 text-sm font-semibold leading-6 text-background hover:ease-in-out hover:bg-gray-400"
          />
          <SignUpButton />
        </form>
      </div>
    </div>
  );
}
