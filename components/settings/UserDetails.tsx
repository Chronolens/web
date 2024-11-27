import userAvatar from "@/public/static/images/user-avatar.png";
import Image from "next/image";

export function UserDetails() {
  //FIX: Replace with actual user data by fetching it
  const user = {
    name: "John Doe",
    email: "johndoe@placeholder.xyz",
  };
  return (
    <div className="flex flex-row">
      <Image
        className="rounded-full"
        src={userAvatar}
        width={80}
        height={80}
        alt=""
      />
      <div className="flex flex-col ml-5 justify-center">
        <span className="text-xl"> {user.name}</span>
        <span> {user.email}</span>
      </div>
    </div>
  );
}
