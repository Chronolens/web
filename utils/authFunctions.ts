
export const postSignIn = async () => {
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
  
    if (!emailInput || !passwordInput) {
      alert("Email or password input not found");
      return;
    }
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      window.location.href = "/Home"; // Redirect to home page on successful login -> should be renamed Gallery
    } else {
      alert("Invalid credentials");
    }
  };

  export const postSignUp = async () => {
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
  
    if (!emailInput || !passwordInput) {
      alert("Email or password input not found");
      return;
    }
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      window.location.href = "/"; // Redirect to home page on successful login -> should be renamed Gallery
    } else {
      alert("Invalid credentials");
    }
  };
  
  export const getSignUp = (router: any) => {
    router.push("/SignUp"); // Navigate to the SignUp page
  };
  
  export const getSignIn = (router: any) => {
    router.push("/"); // Navigate to the SignUp page
  };