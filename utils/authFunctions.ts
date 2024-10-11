// utils/authFunctions.ts

import { SignInRequest, SignUpRequest } from "../types/AuthModels"; // Import models

export const postSignIn = async () => {
  const usernameInput = document.getElementById('username') as HTMLInputElement | null;
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;

  if (!usernameInput || !passwordInput) {
    alert("Username or password input not found");
    return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Create the typed request object using SignInRequest model
  const signInData: SignInRequest = { username, password };

  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signInData), // Send typed data
  });

  if (response.ok) {
    window.location.href = "/Gallery"; // Redirect to Gallery on successful login
  } else {
    alert("Invalid credentials");
  }
};

export const postSignUp = async () => {
  const usernameInput = document.getElementById('username') as HTMLInputElement | null;
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;

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
    window.location.href = "/Gallery"; // Redirect to Gallery on successful sign-up
  } else {
    alert("Invalid credentials");
  }
};

export const getSignUp = (router: any) => {
  router.push("/SignUp"); // Navigate to the SignUp page
};

export const getSignIn = (router: any) => {
  router.push("/"); // Navigate to the SignIn page
};
