export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Trunk-based demo</h1>
      <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        One trunk, two environments. Every merge to <code>main</code> deploys to
        staging once CI passes. Every <code>v*</code> tag deploys that exact commit
        to production. The banner at the top shows which environment and commit you
        are looking at.
      </p>
    </main>
  );
}
