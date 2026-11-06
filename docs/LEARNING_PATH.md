# Trunk-based development: learning path

Goal: by the end, you can explain (and have done) every step of a trunk-based workflow:
short-lived branches → one shared `main` → automatic staging deploys → tagged production
releases → features switched on and off with flags, independently of deploys.

**Setup:** Next.js app · GitHub repo · GitHub Actions CI · Render (staging + production) ·
flags built by hand first, then a hosted flag service (PostHog).

**How we work:** you run the git commands (branch, commit, push, PR, merge, tag) yourself;
Claude explains each step and writes the boilerplate.

---

## Phase 0: The core ideas (read once, revisit at the end)

- **One trunk.** Everyone integrates into `main` at least once a day. No long-lived
  `develop` / `release` / feature branches.
- **Branches are short-lived.** Hours, at most a day or two. Small PRs, merged quickly.
- **`main` is always releasable.** CI guards it: nothing merges unless tests and build pass.
- **Deploy ≠ release.** Code can sit in production *switched off* behind a flag. "Releasing"
  a feature means flipping its flag, not merging or deploying.
- **Fix forward.** Problems are fixed with a new commit on `main` (or by switching a flag
  off), not by long-running hotfix branches.

## Phase 1: Repo and app skeleton
- [ ] Create an empty **public** GitHub repo (public = free branch protection + environment rules)
- [ ] Scaffold the Next.js app, make `main` the default branch, push
- [ ] Protect `main`: require a PR and passing CI checks, block force pushes

## Phase 2: CI, the gatekeeper of the trunk
- [ ] GitHub Actions workflow: lint, type-check, test, build on every PR and push to `main`
- [ ] Your first trunk-based cycle: short branch → PR → green CI → merge → delete branch

## Phase 3: Two environments
- [ ] Two Render web services: `staging` and `production`, both with auto-deploy **off**
- [ ] Push to `main` + CI green → GitHub Actions deploys **staging**
- [ ] Push a tag like `v0.1.0` → GitHub Actions deploys that exact commit to **production**
- [ ] Each environment has its own environment variables

## Phase 4: Feature flags built by hand
- [ ] A small `flags` module: defaults in code, overrides from environment variables
- [ ] Flags evaluated on the **server at request time**, not baked in at build time
      (Next.js gotcha: `NEXT_PUBLIC_*` values are frozen into the build)
- [ ] A `/flags` debug page showing which flags are on in this environment

## Phase 5: Feature cycles (the heart of it)
- [ ] **Dark launch:** merge a half-finished feature with its flag OFF everywhere; ship it to production hidden
- [ ] **Staged rollout:** flag ON in staging, test, then ON in production
- [ ] **Kill switch:** a feature misbehaves in production → turn the flag off (no rollback, no hotfix branch)
- [ ] **Multi-PR feature:** build one feature across several small PRs, all merged behind one flag
- [ ] **Fix forward / rollback:** fix a bug on `main` and tag a patch release; also try redeploying a previous tag

## Phase 6: Hosted flag service
- [ ] Move flags to PostHog (free tier) and change them at runtime without redeploying
- [ ] Try a percentage rollout (for example 20% of users)

## Phase 7: Finish properly
- [ ] Remove a fully rolled-out flag and its dead code (flags are temporary; this is part of the job)
- [ ] Retrospective: compare what you did with GitFlow, and when each model fits

---

## Progress log
<!-- Add a line each time you finish a phase: date, what you did, what surprised you. -->
