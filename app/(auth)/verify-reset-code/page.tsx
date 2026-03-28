"use client";

import { Suspense } from "react";
import { Loader } from "@/shared/components/ui/Loader";
import VerifyResetCodeContent from "./VerifyResetCodeContent";

export default function VerifyResetCodePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader size="lg" />
        </div>
      }
    >
      <VerifyResetCodeContent />
    </Suspense>
  );
}
