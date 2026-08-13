# GLOBORDER DESIGN FREEZE v1.0

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

A deliberate visual-axis change requires a separate Owner-retained Design Rebaseline decision.