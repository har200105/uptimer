'use client';

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NotFoundPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="text-5xl font-semibold text-gray-900">404</div>
      <p className="mt-3 text-sm text-gray-400">Page not found</p>
      <Button
        onClick={() => router.back()}
        disabled={false}
        className="mt-6 rounded-full bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none"
        label="Go Back"
      />
    </div>
  );
}