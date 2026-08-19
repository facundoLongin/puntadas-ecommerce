"use client";

import Link from "next/link";
import { CheckCircle2, UserRound, X } from "lucide-react";
import { useCartFeedback } from "@/features/cart/cart-feedback-context";

export function CartFeedback() {
  const { feedback, dismissCartFeedback } = useCartFeedback();

  if (!feedback) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-24 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-md border border-[#d8c4a5] bg-white p-4 shadow-[0_18px_48px_rgba(33,29,25,0.16)] sm:right-6"
    >
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef2e4] text-[#6f7c4e]">
          {feedback.tone === "auth" ? <UserRound className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#211d19]">{feedback.title}</p>
          <p className="mt-1 text-sm leading-5 text-[#62594f]">{feedback.description}</p>
          <Link
            href={feedback.href}
            className="mt-3 inline-flex text-sm font-semibold text-[#6f7c4e] transition hover:text-[#4f5a35]"
            onClick={dismissCartFeedback}
          >
            {feedback.actionLabel}
          </Link>
        </div>
        <button
          type="button"
          aria-label="Cerrar aviso"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#62594f] transition hover:bg-[#f4efe7]"
          onClick={dismissCartFeedback}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
