// utils/authFunctions.ts
import { cookies } from "next/headers";
import { SignInRequest, SignUpRequest } from "../types/AuthModels"; // Import models

export async function postSignIn(
  username: string,
  password: string,
): Promise<boolean> {
  if (!username || !password) {
    alert("Username or password input not found");
    return false;
  }

  const signInData: SignInRequest = { username, password };

  const response = await fetch("/api/auth/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signInData), // Send typed data
  });

  if (response.ok) {
    const data = await response.json();

    const token = data.token;

    cookies().set("authToken", token, { secure: true, path: "/" });

    return true;
  } else {
    return false;
  }
}

export const postSignUp = async () => {
  const usernameInput = document.getElementById(
    "username",
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password",
  ) as HTMLInputElement | null;

  if (!usernameInput || !passwordInput) {
    alert("Username or password input not found");
    return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Create the typed request object using SignUpRequest model
  const signUpData: SignUpRequest = { username, password };

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signUpData), // Send typed data
  });

  if (response.ok) {
    window.location.href = "/";
  } else {
    window.location.href = "/";
  }
};

export const getSignUp = (router: any) => {
  router.push("/sign_up"); // Navigate to the SignUp page
};

export const getSignIn = (router: any) => {
  router.push("/"); // Navigate to the SignIn page
};

export const getLogout = () => {
  // Delete the authToken cookie by setting its expiration date to a past date
  //document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // To remove all cookies, loop over them
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  // Redirect to sign-in page
  window.location.href = "/";
};
