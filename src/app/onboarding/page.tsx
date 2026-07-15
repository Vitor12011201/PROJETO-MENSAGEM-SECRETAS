import { OnboardingForm } from "@/features/onboarding/OnboardingForm";
import { SiteHeader } from "@/components/site/site-header";

export default function OnboardingPage() {
  return <><SiteHeader /><main className="px-4 py-16"><OnboardingForm /></main></>;
}

