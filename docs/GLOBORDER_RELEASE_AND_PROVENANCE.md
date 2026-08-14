# GLOBORDER RELEASE AND PROVENANCE v1.0

Status: `CANONICAL PRODUCTION PROVENANCE / 2026-08-13 KST`

## Production authority

- Public domains: `https://www.globorder.kr`, `https://globorder.kr`
- Canonical production repository: `jerrybay889/globorder-website`
- Canonical branch: `main`
- Baseline current main SHA: `623631cb56184699ce07b73dea7cec8db64bdf3d`
- Vercel project: `globorder-website`
- Vercel project ID: `prj_iyqEvwS7IhDtvG33zYQ4rbrp1MkX`
- Latest verified production deployment during G0 audit: `dpl_DM8m7igcxoddVuiJyyz6zqMAYxYe`
- Deployment state: `READY`
- Deployment Git source: `jerrybay889/globorder-website / main / 623631cb56184699ce07b73dea7cec8db64bdf3d`

## Historical repository classification

`jerrybay889/globorder-site` is a historical prototype/design archive. It contains multiple parallel HTML prototype folders from the earlier design process and is **not** the production release authority.

It may be used for design/reference archaeology only. Future implementation must target `jerrybay889/globorder-website` unless a separate repository migration is explicitly approved.

## Current public architecture

The production repository is static-first and includes shared assets plus public HTML pages including:

- `index.html`
- `ai-academy.html`
- `ai-consulting.html`
- `smb-ai.html`
- `gov-project.html`
- `global-ecommerce.html`
- `digital-marketing.html`
- `about.html`
- `contact.html`
- `assets/css/globals.css`
- `assets/js/main.js`
- `vercel.json`

## Release gate

Because Vercel production is Git-connected to `main`, future `main` changes are production-impacting.

Execution contract for G1/G2 public-site changes:

`fresh main → isolated task branch/worktree → one Writer → deterministic/static QA → Draft PR → Vercel Preview → browser/content/evidence QA → fresh fixed-SHA review → Owner Ready/Merge decision → production verification`.

Do not bypass Preview/review for routine public changes.

## Design authority

`docs/GLOBORDER_DESIGN_FREEZE.md` is the repository-local design boundary for all G1/G2 public expansion.

## Evidence authority

`docs/GLOBORDER_PUBLIC_CLAIM_EVIDENCE_AUDIT.md` is the repository-local reuse gate for quantified public claims.

## Confidentiality boundary

Private education-planning/proposal reference files used by the Sales OS must stay in private SSOT/Drive surfaces. Their URLs, institution identity, internal schedule/budget/contact information and metadata must not be committed to this public repository.