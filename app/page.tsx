import { redirect } from "next/navigation";
export default function Home() {
  // for now this page is just a redirect to the gallery
  // eventually it will be a landing page
  return redirect("/gallery");
}
