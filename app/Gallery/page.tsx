import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user info (authentication check)
    async function fetchUser() {
      const response = await fetch("/api/auth/user");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push("/SignIn");
      }
    }
    fetchUser();
  }, [router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.email}!</h1>
      <p>You are successfully logged in.</p>
    </div>
  );
}