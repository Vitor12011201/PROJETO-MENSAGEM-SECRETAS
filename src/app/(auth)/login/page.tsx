import { AuthForm } from "@/features/auth/AuthForm";
import { SiteHeader } from "@/components/site/site-header";

export default function LoginPage() {
  return <><SiteHeader /><main className="px-4 py-16"><AuthForm mode="login" /></main></>;
}

