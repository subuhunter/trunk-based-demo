import { connection } from "next/server";

const STYLES: Record<string, string> = {
  production: "bg-red-600 text-white",
  staging: "bg-amber-400 text-black",
  local: "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
};

// Shows which environment and which commit is serving this page.
//
// `await connection()` makes Next.js wait for a real request before reading the
// environment variables below. Without it, Next.js would read them once at build
// time and freeze the values into the HTML. Reading at request time is what lets the
// same code behave differently per environment, which is exactly what feature flags
// will rely on in Phase 4.
export async function EnvironmentBanner() {
  await connection();

  const env = process.env.APP_ENV ?? "local";
  // Render sets RENDER_GIT_COMMIT to the full SHA of the commit it deployed.
  const commit = process.env.RENDER_GIT_COMMIT?.slice(0, 7) ?? "uncommitted";

  return (
    <div
      className={`w-full px-4 py-2 text-center text-sm ${STYLES[env] ?? STYLES.local}`}
    >
      Environment: <strong>{env}</strong> · Commit: <code>{commit}</code>
    </div>
  );
}

// Shown in the prerendered page until the real banner streams in.
export function EnvironmentBannerFallback() {
  return (
    <div className="w-full bg-zinc-100 px-4 py-2 text-center text-sm text-zinc-500 dark:bg-zinc-900">
      Loading environment…
    </div>
  );
}
