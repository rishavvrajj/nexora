"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { auth } from "../../../lib/auth";
import { signOut } from "../../../lib/auth-client";

type Session = typeof auth.$Infer.Session;

export default function UserCard({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!session) return null;

  const { user } = session;

  async function handleSignOut() {
    try {
      setIsSigningOut(true);

      await signOut();

      router.push("/auth");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsSigningOut(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <div className="h-2 w-full" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full shadow-md ring-4 ring-zinc-700">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name ?? "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                    {(user.name ?? user.email ?? "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {user.emailVerified && (
                <div
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow ring-2 ring-white"
                  title="Email verified"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
              {user.name ?? "User"}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              {user.email ?? "No email"}
            </p>
          </div>

          <div className="mt-6 space-y-3 rounded-2xl bg-zinc-50 p-4 text-sm">
            <DetailRow label="Email" value={user.email ?? "—"} />

            <DetailRow
              label="Email verified"
              value={
                user.emailVerified
                  ? user.emailVerified.toLocaleString()
                  : "Not verified"
              }
            />

            <DetailRow label="User ID" value={user.id} />
          </div>

          <div className="mt-5 text-center text-xs text-zinc-400">
            Signed in as {user.email}
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="mt-6 w-full cursor-pointer rounded-lg bg-black/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-medium text-zinc-600">{label}</span>
      <span className="truncate text-right text-zinc-900">{value}</span>
    </div>
  );
}