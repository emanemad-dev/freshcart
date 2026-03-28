import { Suspense } from "react";
import { Loader } from "@/shared/components/ui/Loader";
import ResetPasswordContent from "./ResetPasswordContent";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
