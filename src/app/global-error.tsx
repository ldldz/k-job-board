"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <main className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Something went wrong!</h1>
          <Link href="/" className="text-sm0 underline hover:text-blue-800">
            홈으로
          </Link>
        </main>
      </body>
    </html>
  );
}
