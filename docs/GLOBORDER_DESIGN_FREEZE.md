# GLOBORDER DESIGN FREEZE v1.1

Status: `CANONICAL / OWNER-DIRECTED / 2026-08-13 KST`

This repository's current visual axis is an Owner-approved brand asset. Future website expansion must preserve the existing design grammar instead of replacing it with a new design system.

## Frozen source baseline

- Repository: `jerrybay889/globorder-website`
- Baseline main SHA: `623631cb56184699ce07b73dea7cec8db64bdf3d`
- Primary shared stylesheet: `assets/css/globals.css`

## Frozen design tokens

The following current tokens are load-bearing and must not be broadly replaced:

- `--navy-deep: #0A1628`
- `--navy-mid: #0F2040`
- `--cyan: #00D4FF`
- `--cyan-muted: #00A8CC`
- `--white: #FFFFFF`
- `--surface: #F8F9FA`
- `--max-w: 1280px`
- Korean font family: Pretendard/Noto Sans KR/system sans stack
- English font family: Inter/system sans stack

## Frozen global shell

Preserve the current family of:

- GloBorder logo treatment and proportions
- fixed dark navigation shell
- navy hero surfaces and cyan accent hierarchy
- asymmetric hero composition
- Korean-first body typography with English eyebrow/display moments
- authority-driven whitespace and section rhythm
- cyan primary CTA behavior
- current mobile drawer identity
- subtle reveal motion only
- the persistent right-side `상담및문의` trigger and its single Tally modal path

## Frozen editorial and presentation principles

The public website must read as a composed corporate website, not as an internal
project register, QA receipt, backlog, or document repository.

- Lead with the visitor's problem, the business meaning, and the next action.
- Use Korean-first, concise, declarative copy with restrained English eyebrows.
- Keep titles and section meaning visually primary. Dates, draft labels, internal
  lifecycle terms, and implementation metadata must not dominate public pages.
- Use short summaries on collection pages and route to dedicated detail pages for
  longer reading.
- Present prototypes as selected solution experiences and explain what they help
  a visitor judge. Preserve factual boundaries without turning the first viewport
  into a disclaimer wall.
- Never invent customers, logos, delivery status, performance figures, or adoption
  results. Public-safe product structure and verified role context are acceptable.
- JERRYBAY, AIKUS, OMYQT, INVIT, education, public-project, and commerce experience
  may inform GLOBORDER content only after it is rewritten in the GLOBORDER company
  voice and checked for public-safe claim boundaries.

## Frozen information architecture details

- The final primary menu label is `About` and routes to `/about`.
- `프로젝트 사례` is the single primary destination for project proof and
  public-safe prototypes. Do not add a separate `프로토타입 랩` primary menu.
- Every project card uses the most truthful evidence action for that case:
  an accessible lightweight modal only for a real, useful working demo; an
  explicit external link for an existing public site; or a dedicated detail
  page when the role, context, and evidence need longer explanation.
- Do not create decorative mock demos merely to fill a modal. Do not repeat the
  same short prototype narrative in a second collection.
- The legacy `/prototype-lab` path must preserve inbound links by forwarding to
  `/work#selected-projects`; it is not a second public collection or buyer-facing
  destination.
- About remains concise: company introduction, mission, vision, values, menu-level
  shortcuts, and one consultation action.
- The canonical public address string is
  `서울 구로구 디지털로26길 61, 에이스하이엔드타워1차`.
- The persistent `상담및문의` trigger must remain available across new collection
  and detail pages. It must open the same Tally modal and must not be replaced by
  an inline fake-success form.

## Expansion rules

New pages such as Academy program details, References and Insights must look native to the current Globorder website.

Allowed:

- new list/detail components that reuse current tokens
- additional content hierarchy
- evidence panels, filters, search, tables, timelines, diagrams and editorial layouts
- responsive improvements that preserve the visual identity

Not allowed without a new explicit Owner design decision:

- broad homepage redesign
- purple/magenta brand pivot
- cyberpunk/neon or glowing-orb AI aesthetic
- replacing the shared typography system
- generic equal-height card-grid redesign across all pages
- replacing the current global shell with a transplanted JERRYBAY/KOAECA design
- independent page-level token systems that conflict with `globals.css`

## Design-regression gate

Any future public-site PR must verify:

1. shared tokens remain compatible with this contract;
2. header/logo/nav/hero family remains recognizable as current Globorder;
3. new components do not make the public website look like an ERP/Admin dashboard;
4. mobile layout preserves the same brand character;
5. no public content is changed merely to justify a visual redesign.
6. collection cards and article pages preserve concise hierarchy at desktop and
   mobile widths without horizontal overflow;
7. every public insight summary opens a readable dedicated detail page;
8. the `About` label, canonical address, and persistent consultation trigger are
   consistent across the public site.
9. project proof and prototype viewing remain one coherent journey under
   `프로젝트 사례`, without duplicate primary navigation destinations.

A deliberate visual-axis change requires a separate Owner-retained Design Rebaseline decision.
