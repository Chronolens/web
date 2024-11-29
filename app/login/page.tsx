import { LoginForm } from "@/components/login/LoginForm";
import { MainLogo } from "@/components/MainLogo";

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
