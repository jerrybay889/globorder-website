# GLOBORDER PUBLIC CLAIM EVIDENCE AUDIT v1.1

Status: `CONTROL / EVIDENCE GATE / 2026-08-13 KST`

Purpose: prevent unsupported public metrics from being copied into new landing pages, brochures, proposals, outbound messages, References or Insights.

## Claim states

- `VERIFIED_PUBLIC` - public evidence URL/document supports the claim and publication scope.
- `VERIFIED_INTERNAL` - internal evidence exists but public reuse requires a separate disclosure decision.
- `NEEDS_EVIDENCE` - claim is currently public or proposed but no evidence chain has been bound in this repository/SSOT review.
- `REJECTED` - claim is misleading, incorrect or not publishable.

## Current quantified claims requiring evidence binding

Source reviewed: `index.html` at `623631cb56184699ce07b73dea7cec8db64bdf3d`.

| Current public claim | Source location | Current evidence state | Reuse rule |
|---|---|---|---|
| `견적서 초안 작성 시간 70% 단축, 주당 10시간 절감` | Home References / AI sales assistant card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |
| `수동 3시간 → 자동 15분 처리, 오기입 오류율 제로` | Home References / product-registration automation Agent card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |
| `첫 작동 버전 3주 내 납품, 응대 커버리지 24시간으로 확대` | Home References / customer-response AI chatbot card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |
| `반복 업무 80% 자동화` | Home References / internal Agentic automation card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |
| `참가사 NPS 92 · 프로젝트 연결 5건` | Home References / AI strategy workshop card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |
| `수료생 12명 중 8팀 서비스 출시` | Home References / AI MVP build camp card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |
| `3개 부처 · 수료 200명+` | Home References / public-agency AI literacy training card | `NEEDS_EVIDENCE` | Do not copy into Academy/B2B landing, brochure, proposal or outbound until evidence is bound. |

This table does **not** assert that the claims are false. It records only that the current G0 audit has not yet bound sufficient evidence.

## Exhaustiveness rule for G0

The seven rows above are the complete quantified-claim inventory for the current Home References cards reviewed in `index.html@623631cb...` across the AI Build and AI Education panels. G1/G2 must not introduce or reuse any of these metrics unless the individual claim has moved to an approved evidence state.

If a future Home change introduces a new quantified outcome, the evidence audit must be updated before that claim is reused in another page, brochure, proposal, outbound message, Reference or Insight.

## Evidence record requirements

A quantified claim becomes reusable only when an evidence record identifies:

1. exact claim text and metric definition;
2. project/course cohort and period;
3. source document or raw measurement;
4. whether the evidence can be published;
5. whether Globorder itself delivered the work or the claim relates to prior-employer/partner participation;
6. reviewer and review date;
7. approved publication wording.

## Attribution rules

- Prior-employer or partner-project participation must not be presented as a Globorder corporate delivery unless that relationship is factually supportable.
- Prototype/concept screens must not be presented as delivered customer production systems.
- AI-generated illustration must not be used as customer-result evidence.
- Private client names, internal documents or non-public project details cannot become public proof merely because they exist internally.

## Sales/content gate

Before G1/G2 reuse, each claim must resolve to either:

- `VERIFIED_PUBLIC` with an approved public wording; or
- a factual non-quantified rewrite that does not depend on the unresolved metric.

The private university education-planning reference used by the Academy Sales OS is intentionally **not** stored or linked in this public repository.
