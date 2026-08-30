import { RedirectToLogin } from "@/components/shared/RedirectToLogin";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin [animation-duration:0.4s]" />
        Loading...
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RedirectToLogin />
    </Suspense>
  );
}
