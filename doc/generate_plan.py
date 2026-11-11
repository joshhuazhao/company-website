"""Generate the implementation plan Word document (for review & approval)."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

OUT = "/Users/josh/solution/company-website/doc/Company-Website-Implementation-Plan.docx"

doc = Document()
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(11)


def h1(t): return doc.add_heading(t, level=1)
def h2(t): return doc.add_heading(t, level=2)
def h3(t): return doc.add_heading(t, level=3)


def p(text, bold=False, italic=False):
    para = doc.add_paragraph()
    r = para.add_run(text)
    r.bold = bold
    r.italic = italic
    return para


def bullet(text, prefix=None):
    para = doc.add_paragraph(style="List Bullet")
    if prefix:
        r = para.add_run(prefix)
        r.bold = True
    para.add_run(text)
    return para


def table(headers, rows):
    t = doc.add_table(rows=1 + len(rows), cols=len(headers))
    t.style = "Table Grid"
    for i, htext in enumerate(headers):
        cell = t.rows[0].cells[i]
        cell.text = htext
        for r in cell.paragraphs[0].runs:
            r.bold = True
    for ri, row in enumerate(rows, start=1):
        for ci, val in enumerate(row):
            t.rows[ri].cells[ci].text = str(val)
    for row in t.rows:
        for cell in row.cells:
            for para in cell.paragraphs:
                for run in para.runs:
                    run.font.size = Pt(9.5)
    doc.add_paragraph()
    return t


# ================= Title =================
doc.add_heading("Company Website Re-platforming - Implementation Plan", level=0)
sub = doc.add_paragraph()
sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = sub.add_run(
    "Project: company-website (leanjust.com)\n"
    "Status: DRAFT - for review and approval before execution\n"
    "Inputs: doc/requirements.docx (business & technical requirements), "
    "doc/Company-Website-Code-Review-Report.docx (19 issues found in current codebase)\n"
    "Plan language: English (author's working language), as requested"
)
r.italic = True
doc.add_paragraph()

# ================= 1. Purpose =================
h1("1. Purpose and Scope")
p("This document translates the approved requirements (doc/requirements.docx) into an executable implementation plan. It is submitted for review and approval BEFORE execution. It covers:")
bullet("a complete re-platforming of the current React/Vite SPA + Express/PostgreSQL/Firebase site onto Next.js + Tailwind (frontend) and FastAPI + MongoDB (backend),")
bullet("the new sitemap and ibm.com-referenced layout,")
bullet("the expanded authentication scope (WeChat / Microsoft / Google / local email),")
bullet("a marketing-group-only admin CMS with document/picture/video upload,")
bullet("session indication in the layout and demo linkages on the iDAP/iSMS product pages, and")
bullet("remediation of all 19 bugs and risks identified in the code review report.")
p("Open questions and prerequisite conditions that must be answered before or during execution are consolidated in Sections 8 and 9.")

# ================= 2. Current vs Target =================
h1("2. Current State vs. Target State")
table(
    ["Area", "Current (code review findings)", "Target (per requirements)"],
    [
        ["Frontend", "React 19 + Vite + Bootstrap 5, single 770 KB bundle, client-side routing, no 404 page", "Next.js (App Router) + Tailwind CSS, SSR/SSG, built-in code splitting, not-found page"],
        ["Backend", "Express 5 (plain JS) + firebase-admin", "FastAPI (Python 3.12), typed (Pydantic), structured logging"],
        ["Database", "PostgreSQL (market_client) + Firestore for roles/content", "MongoDB (users, profiles, content collections, media metadata)"],
        ["Auth", "Google popup only, role in a client-readable Firestore doc (Issue #1/#3)", "Sign in/sign up: WeChat, Microsoft, Google, local email+password; server-issued sessions"],
        ["Admin", "Client-side-only admin; browser writes to Firestore; data seeder duplicates docs (Issues #8/#16)", "Server-enforced marketing-group role; CMS with topic editing and document/picture/video upload"],
        ["i18n", "EN/ZH via runtime JSON + ad-hoc Firestore/locale merging (Issues #11/#12)", "Unified bilingual content model in MongoDB, single source of truth"],
        ["Deployment", "Docker Compose: nginx + Node API + PostgreSQL + certbot", "Docker Compose: nginx/TLS + Next.js + FastAPI + MongoDB (+ object storage for media) + certbot"],
    ],
)

# ================= 3. Requirements analysis =================
h1("3. Requirements Analysis (from requirements.docx)")
h2("3.1 Technical requirements")
bullet("Frontend framework: Next.js + Tailwind.", prefix="Mandatory: ")
bullet("Backend framework: FastAPI + MongoDB.", prefix="Mandatory: ")
bullet("Interpretation: the current React/Vite/Bootstrap/Express/PostgreSQL/Firebase stack is fully replaced, not incrementally migrated. Existing data (profiles, product/service/solution content, translations) is exported and re-seeded into MongoDB.")
h2("3.2 UI / layout")
bullet("Refer to ibm.com: adopted as the design reference - clean enterprise look, mega-menu navigation, sectioned content bands, sticky masthead with session/sign-in area, page-level breadcrumbs where appropriate.")
bullet("Default page is Home; clicking the company logo navigates Home (standard masthead behaviour).")
bullet("New sitemap (implemented as routes in Section 5, Phase 2):")
code = doc.add_paragraph()
cr = code.add_run(
    "/                     Home (default)\n"
    "/products             Product overview\n"
    "/products/idap        iDAP\n"
    "/products/isms        iSMS  (both with demo linkage - Phase 2)\n"
    "/solutions            Solution overview\n"
    "/solutions/industries/[industry]\n"
    "                      Automotive components | Electronic equipment |\n"
    "                      Food and beverage | Education | Super Intelligent\n"
    "/partners/certified   Certified partner\n"
    "/partners/become      Become partner"
)
cr.font.name = "Consolas"
cr.font.size = Pt(9)
bullet("Bilingual content (EN/ZH) is preserved from the current site - an explicit confirmation question is raised in Section 9 (Q10).")
h2("3.3 Authentication")
bullet("Sign-in / sign-up supporting three federated identities - WeChat ID, Microsoft ID, Google ID - plus local authentication with an owned e-mail address and password.")
bullet("All four flows terminate in a server-issued session (httpOnly JWT cookie), and the session is shown in the layout (masthead account menu) - see 3.4 and open question Q2.")
bullet("Local auth requires e-mail verification and password-reset flows (SMTP prerequisite, question Q6).")
h2("3.4 Business requirements")
bullet("Admin page dedicated to the marketing group; invisible and inaccessible to all other users (404 for non-admins, role enforced server-side).", prefix="Marketing admin: ")
bullet("Edit topics: manage content for all pages/sections.", prefix="Content editing: ")
bullet("Upload documents, pictures, video, etc. (object storage prerequisite, question Q9).", prefix="Media upload: ")
bullet("Add session in the layout - interpreted as a logged-in session indicator (account menu/avatar) in the masthead; to be confirmed (question Q2).", prefix="Session: ")
bullet("Add demo linkage from products iDAP and iSMS (CTA buttons/links; content source to be provided, question Q3).", prefix="Demo linkage: ")
h2("3.5 Fix existing bugs and risks")
p("All 19 issues from the code review report are dispositioned in Section 7. Three critical security items (#1 client-side admin, #2 weak DB password, #3 Firestore client writes) are structurally resolved by the new architecture; the remainder are fixed as explicit plan tasks.")

# ================= 4. Target architecture =================
h1("4. Proposed Target Architecture")
code = doc.add_paragraph()
cr = code.add_run(
    "Browser\n"
    "  |\n"
    "  v\n"
    "nginx (TLS via certbot)  --static/SSR-->  Next.js 15 (App Router, Tailwind, Node runtime)\n"
    "  |--- /api/* ----------------------->  FastAPI (uvicorn)\n"
    "                                            |---> MongoDB  (users, sessions, content, media metadata)\n"
    "                                            |---> Object storage (MinIO / S3 / OSS: docs, images, video)\n"
    "                                            |---> OAuth: WeChat Open Platform / Microsoft Entra / Google\n"
    "                                            |---> SMTP (e-mail verification, password reset)\n"
    "Docker Compose services: web(next) | api(fastapi) | db(mongo) | storage(minio) | certbot"
)
cr.font.name = "Consolas"
cr.font.size = Pt(9)
h3("Key technical decisions (for approval)")
table(
    ["#", "Decision", "Rationale"],
    [
        ["D1", "Auth handled entirely in FastAPI (OAuth code flows for WeChat/Microsoft/Google + local e-mail/password); Next.js consumes a signed httpOnly session cookie via a /api/session endpoint and middleware", "One authoritative, server-verified role model (fixes review issues #1/#3/#10); Auth.js has no official WeChat provider and would split the trust model across two runtimes"],
        ["D2", "Roles as server-side MongoDB documents with server-issued JWT claims (sub, role, groups); marketing membership is NEVER decided client-side", "Requirement that non-marketing users cannot even see the admin page; admin API calls return 403 and the admin route returns 404 for non-members"],
        ["D3", "Content model: one MongoDB collection per content type (products, solutions_industry, partners, home_sections, resources) with embedded EN/ZH fields per topic", "Single source of truth; fixes review issues #11/#12 (today's Firestore-vs-locale duplication); admin edits one document and both languages update"],
        ["D4", "Media uploaded to S3-compatible object storage (MinIO in Docker for dev; cloud S3/OSS for prod - question Q9); only metadata + URLs stored in MongoDB", "Documents/video are too large for MongoDB GridFS-at-scale and not CDN-cacheable; signed URLs allow private media if required"],
        ["D5", "Monorepo: frontend/ (Next.js) + backend/ (FastAPI) with shared docker-compose and CI", "Review issue #18 (no tests/CI) resolved from day one; one PR can touch both sides of a feature"],
        ["D6", "Keep the existing deployment pattern: single host, Docker Compose, nginx, Let's Encrypt/certbot", "Proven working stack; lowest operational risk; Q12 confirms no move to Vercel/Atlas is desired"],
        ["D7", "MongoDB with a single-node replica set (self-hosted in Docker)", "Enables change streams and transactions (needed for session revocation and audit-safe admin edits) without Atlas cost"],
    ],
)

# ================= 5. Phases =================
h1("5. Implementation Phases")
p("Sequencing rationale: foundation first, public site second (visible value early), then auth (session is prerequisite for the admin CMS), then admin CMS, then migration, then hardening and go-live. Phases 1 and parts of 0 can run in parallel while open questions are being answered.")

h2("Phase 0 - Prerequisites, decisions and content intake (1 week, starts immediately, runs in parallel)")
bullet("Collect all answers to Section 9 questions (blocking items flagged per question).")
bullet("Provision credentials: WeChat Open Platform app (AppID/Secret), Microsoft Azure app registration (client id/secret/redirect URIs), Google OAuth client (reuse current), SMTP account, object storage bucket, MongoDB volume.")
bullet("Rotate the production database password (review issue #2) - do not carry the weak password into the new stack.")
bullet("Content intake from marketing: copy + imagery for Home, iDAP, iSMS, the 5 industry solutions, Partner pages (certified + become), demo links for iDAP/iSMS, 'Super Intelligent' definition (Q13).")
bullet("Bootstrap super-admin account list for the new system (minimum two people from marketing).")
bullet("Deliverable: prerequisites checklist 100% complete. Acceptance: this plan is formally approved (Section 11).")

h2("Phase 1 - Foundation and scaffolding (2 weeks)")
bullet("Monorepo scaffold: frontend/ (Next.js 15 App Router + TypeScript + Tailwind 4 + ESLint/Prettier) and backend/ (FastAPI + Uvicorn + Pydantic v2 + Motor/Beanie + pytest).")
bullet("MongoDB schema (single source of truth - fixes issue #9): users, profiles, sessions, content collections, media, audit_log.")
bullet("Design system: Tailwind theme tokens referencing ibm.com (typography, spacing, color, masthead/mega-menu components, Carbon-inspired aesthetic - see Q1 for approval).")
bullet("Dev/production Docker Compose (web/api/mongo/minio/certbot) + nginx config + CI pipeline (lint, type-check, unit tests, build) - resolves issue #18 from the start.")
bullet("Security baseline: secrets via .env (never committed; keep current .gitignore), strong generated passwords, no default fallbacks (issue #2), non-root container users.")
bullet("Acceptance: docker compose up renders the scaffolded Home page over TLS locally; CI is green; a placeholder 404/not-found page works (issue #5 fixed structurally).")

h2("Phase 2 - Core public website (2.5 weeks)")
bullet("Masthead/layout: sticky header with navigation, company logo -> Home, language switch (EN/ZH), session area placeholder (wired in Phase 3), ibm.com-style footer; content rendered server-side for SEO.")
bullet("Pages per the sitemap: Home; Product overview + iDAP + iSMS (with demo linkage CTAs - requirement 3.4); Solution overview + 5 industry pages (automotive components, electronic equipment, food and beverage, education, Super Intelligent); Certified partner; Become partner.")
bullet("All page content served from MongoDB via public read APIs (GET /api/content/...); bilingual fields rendered by locale - one content model (fixes issues #11/#12).")
bullet("Route handlers: not-found.tsx for 404 (issue #5), proper metadata (title/description/favicon) per page (fixes issue #13), image optimization via next/image (fixes the 750 KB hero image problem, issue #7).")
bullet("Responsive across desktop/tablet/mobile; WCAG AA contrast basics.")
bullet("Acceptance: full sitemap navigable in both languages; Lighthouse performance >= 90 on Home; no blank-page routes.")

h2("Phase 3 - Authentication and session (2.5 weeks)")
bullet("Local auth: sign-up with e-mail verification (SMTP), sign-in, password reset, argon2/bcrypt hashing, password policy; profile page recreated (migrated market_client data if approved, Q8).")
bullet("Federated sign-in implemented as OAuth code flows in FastAPI: Google, Microsoft (Entra - Q5), WeChat Open Platform QR login (Q4; de-scope to a fast-follow if the account is not approved in time).")
bullet("Session: httpOnly, SameSite=Lax, signed JWT cookie; session indicator + account menu in the masthead (the 'session in the layout' requirement - Q2); sign-out everywhere.")
bullet("API hardening (fixes issues #4/#15): Pydantic validation on every endpoint, e-mail treated as identity (not client-editable), rate limiting on auth endpoints, centralized exception handlers, structured logging, audit trail of auth events.")
bullet("Acceptance: all approved providers work end-to-end; sessions visible in layout; invalid/missing roles fail closed (10 failed-login lockout, reset tokens single-use); OWASP ASVS L1 spot-check passes.")

h2("Phase 4 - Marketing admin CMS (3 weeks)")
bullet("Role model: marketing group maintained in MongoDB; authorization enforced by a FastAPI dependency on every admin endpoint and by Next.js middleware for /admin routes - non-members receive a 404 page and 403 on any direct API call (resolves the critical review issues #1/#3 by construction).")
bullet("Admin dashboard: list/filter topics for every content collection (home sections, products incl. iDAP/iSMS, industry solutions, partners, resources); edit EN/ZH fields side-by-side; publish/unpublish; change preview.")
bullet("Media library: upload documents (PDF/Office), pictures (with automatic WebP variants), video (direct upload to object storage or embed URL - Q9); file-type/size validation; alt-text required for accessibility.")
bullet("Demo linkage management: per-product demo URL(s) editable by marketing (feeds the iDAP/iSMS CTAs).")
bullet("Bootstrap super-admin UI to manage marketing-group membership (answers Q11); every admin action written to audit_log.")
bullet("UI uses proper modal/toast components (fixes issue #16); destructive actions confirmed in-app.")
bullet("Acceptance: a marketing user can create/edit/publish every topic and upload all media types; a regular user can neither see /admin nor call any admin API; all admin mutations appear in audit_log.")

h2("Phase 5 - Data migration and content seeding (1 week)")
bullet("Export current Firestore content (products/services/solutions) + public/locales/{en,zh}.json and reconcile into the new bilingual MongoDB content model; deterministic IDs/upserts (fixes the duplicate-seeding issue #8).")
bullet("Migrate market_client PostgreSQL profiles into the MongoDB users/profiles collections (verification e-mails re-sent to activate local credentials - Q8).")
bullet("Retire Firebase: final export, backup, then project shutdown decision after go-live (Q7).")
bullet("Acceptance: parity walkthrough old-site vs new-site for every existing page; row counts and spot-checks documented.")

h2("Phase 6 - QA, performance, security and go-live (2 weeks)")
bullet("Test completion: unit + integration (FastAPI, pytest), E2E for auth and CMS (Playwright), content rendering snapshots for both locales.")
bullet("Performance: code-splitting verification, image/CDN caching, MongoDB indexes; Lighthouse >= 90 across main pages (issue #7 closed).")
bullet("Security review: re-verify all 19 review-report issues are closed (Section 7 sign-off), dependency audit (pip-audit / pnpm audit), TLS config re-check, backup/restore drill for MongoDB volumes (volume mounts corrected per issue #14).")
bullet("Deployment: production Compose stack (nginx + Next.js + FastAPI + MongoDB + MinIO + certbot), staged deployment to a staging hostname, UAT with the marketing team, DNS cutover for leanjust.com (Q14), monitoring/alerting (uptime + error rates), 2-week fast-follow window for WeChat login if deferred (Q4).")
bullet("Acceptance: UAT sign-off by marketing + owner; production checklist complete; rollback plan rehearsed (previous Compose stack is retained until fast-follow window ends).")

# ================= 6. Timeline =================
h1("6. Timeline and Milestones")
table(
    ["Weeks", "Phase", "Milestone / review gate"],
    [
        ["0-1", "P0 Prerequisites", "Plan approved; credentials + content received; DB password rotated"],
        ["1-3", "P1 Foundation", "Scaffold demo + CI green (gate: architecture/design sign-off)"],
        ["3-5.5", "P2 Core website", "Full sitemap live on staging in EN/ZH (gate: design + content approval)"],
        ["5.5-8", "P3 Auth & session", "Sign in/up with approved providers; session in layout"],
        ["8-11", "P4 Admin CMS", "Marketing UAT on CMS; membership + audit verified"],
        ["11-12", "P5 Migration", "Data parity walkthrough approved"],
        ["12-14", "P6 QA & go-live", "Security sign-off (19/19 issues closed), production cutover"],
    ],
)
p("Estimated total: ~14 weeks of execution with one to two developers, assuming prerequisites (Section 8) are met by the end of Week 1. WeChat sign-in is the most likely item to slip past go-live (external approval dependency) and is planned as a safe fast-follow.")

# ================= 7. Issue remediation =================
h1("7. Remediation of the 19 Code-Review Issues")
p("Every issue from the code review report is dispositioned below. 'By design' = structurally resolved by the re-platforming rather than a dedicated fix task.")
table(
    ["#", "Issue (severity)", "How it is resolved", "Phase"],
    [
        ["1", "Client-only admin authorization (CRITICAL)", "By design: roles server-side in MongoDB + JWT claims; /admin and admin APIs enforce server-side; non-admins get 404/403", "P3/P4"],
        ["2", "Weak DB password (CRITICAL)", "Rotate now (P0); new stack uses generated secrets, no 'change-me' fallbacks in Compose", "P0/P1"],
        ["3", "No Firestore rules / client writes (CRITICAL)", "By design: Firestore removed entirely; all writes go through FastAPI with verified sessions", "P3/P4"],
        ["4", "Unvalidated e-mail changes (HIGH)", "Pydantic validation; e-mail is the immutable identity taken from the verified token, not the request body", "P3"],
        ["5", "No 404 route (HIGH)", "By design: Next.js not-found.tsx", "P1/P2"],
        ["6", "Blank app while auth loads (HIGH)", "By design: server components render public pages immediately; session read from cookie without blocking", "P2/P3"],
        ["7", "770 KB bundle / 750 KB hero image (HIGH)", "By design: Next.js code splitting + next/image; verified in performance pass", "P1/P6"],
        ["8", "Data seeder duplicates Firestore docs (HIGH)", "By design + P5: seeding into MongoDB uses deterministic IDs and idempotent upserts", "P5"],
        ["9", "DDL duplicated schema.sql vs db.js (MEDIUM)", "By design: single MongoDB schema definition + migration scripts", "P1"],
        ["10", "Role changes need re-login; silent failures (MEDIUM)", "JWT claims with short TTL + refresh; role changes take effect on refresh (<= 15 min); auth errors surfaced in UI", "P3/P4"],
        ["11", "Duplicated i18n fallback ternaries (MEDIUM)", "By design: unified bilingual content model; no per-field fallback logic in JSX", "P2"],
        ["12", "Dual content sources Firestore vs locale JSON (MEDIUM)", "By design: single MongoDB source with embedded EN/ZH; admin edits affect both languages", "P2/P4"],
        ["13", "Stale index.html refs / metadata (MEDIUM)", "By design: proper Next.js metadata API, favicon, branded titles per page", "P1/P2"],
        ["14", "Postgres volume mount path (MEDIUM)", "By design: PostgreSQL replaced by MongoDB with correct named volumes; backup drill in P6", "P1/P6"],
        ["15", "No API hardening (MEDIUM)", "Dedicated task: rate limiting, Pydantic validation, centralized error handling, structured logging", "P3/P4"],
        ["16", "confirm()/alert() in admin (LOW)", "By design: proper modal/toast components in the new CMS", "P4"],
        ["17", "Lint fast-refresh warning (LOW)", "By design: hooks separated in files following Next.js/React conventions; clean lint gate in CI", "P1"],
        ["18", "No types/tests/CI on server (LOW)", "Dedicated: FastAPI fully typed + pytest coverage; CI runs lint/type-check/tests/build", "P1/P6"],
        ["19", "Dead files / leftovers (LOW)", "By design: greenfield scaffold; dead assets not carried over", "P1"],
    ],
)

# ================= 8. Prerequisites =================
h1("8. Prerequisite Conditions for Execution")
bullet("This plan formally approved (Section 11), including the interpretation choices D1-D7 and the sitemap in 3.2.", prefix="A. ")
bullet("WeChat Open Platform website application (AppID + AppSecret) - externally approved corporate account. BLOCKING for WeChat sign-in; not blocking for launch if deferred (Q4).", prefix="B. ")
bullet("Microsoft Entra ID / Azure app registration for Microsoft sign-in, with redirect URIs for staging and production (Q5).", prefix="C. ")
bullet("Google OAuth client credentials (can be migrated from the current Firebase project config).", prefix="D. ")
bullet("SMTP account for verification/reset e-mails (e.g. SendGrid/SES; Q6).", prefix="E. ")
bullet("Object storage decision: self-hosted MinIO container vs cloud S3/OSS (Q9).", prefix="F. ")
bullet("Domain DNS control over leanjust.com for staging hostname and cutover (Q14).", prefix="G. ")
bullet("Content package from marketing for all new pages (incl. 'Super Intelligent', Q13) and demo links for iDAP/iSMS (Q3).", prefix="H. ")
bullet("Names of at least two bootstrap marketing-group super-admins (Q11).", prefix="I. ")
bullet("Decision on migrating existing PostgreSQL profile data and decommissioning Firebase (Q7/Q8), plus a production database dump if migrating.", prefix="J. ")
bullet("Production password rotation executed before any new deployment (issue #2).", prefix="K. ")

# ================= 9. Open questions =================
h1("9. Open Questions Requiring Clarification")
table(
    ["Q#", "Question", "Impact if unanswered", "Needed by"],
    [
        ["Q1", "Does 'refer to ibm.com' mean (a) adopt the IBM Carbon look-and-feel built in Tailwind, or (b) a custom design merely inspired by ibm.com? Are there brand guidelines/logo files/colors?", "Design rework risk in Phase 2", "P0 (before P2 build)"],
        ["Q2", "'Add session in the layout': confirm this means the logged-in session indicator/account menu in the masthead (our interpretation), not a 'Sessions/Webinars' content section.", "Wrong feature built", "P0"],
        ["Q3", "Demo linkage for iDAP/iSMS: are demo URLs/assets provided externally by marketing, or should demos be hosted pages/videos? Please provide the links.", "CTAs without targets; Phase 2 rework", "P0"],
        ["Q4", "WeChat sign-in requires a verified WeChat Open Platform website app. Who owns the account and when can AppID/Secret be issued? May WeChat launch as a fast-follow if approval is delayed?", "Scope cut decision at go-live", "P0 (account), P3 (keys)"],
        ["Q5", "Microsoft sign-in: personal Microsoft accounts (consumer) or an Entra ID tenant (work/school)? Who owns the Azure tenant and can register the app?", "Wrong provider configuration in P3", "P3"],
        ["Q6", "Local e-mail auth: which SMTP provider for verification/password-reset e-mails? Any password policy requirements?", "Blocks local auth in P3", "P3"],
        ["Q7", "Firebase decommissioning: confirm all Firestore content/users are to be migrated to MongoDB and the Firebase project shut down after go-live. Any other consumers of the project?", "Migration scope in P5", "P5"],
        ["Q8", "Should the existing market_client PostgreSQL profile data be migrated into the new users collection? Please provide a production dump if yes.", "User re-registration vs migration cost", "P5"],
        ["Q9", "Media storage: self-hosted MinIO vs cloud S3/OSS? Max file size and allowed types for admin uploads? Video: direct upload vs embed (YouTube/Bilibili)?", "Storage architecture in P4", "P4 (earlier preferred)"],
        ["Q10", "Keep EN + ZH only, or add more locales now?", "Content model + admin UI layout in P2/P4", "P2"],
        ["Q11", "Who manages marketing-group membership (need >= 2 bootstrap super-admins)? Is an admin-of-admins UI required?", "CMS access governance", "P4"],
        ["Q12", "Hosting: keep single-host Docker Compose + certbot (assumed, decision D6), or move to a managed platform (Vercel + Atlas + Render)?", "Deployment architecture", "P1"],
        ["Q13", "'Super Intelligent' industry solution: please confirm the exact name and provide content (it is one of the five required industry pages).", "One of five Phase-2 pages cannot be built", "P0 (name), P2 (content)"],
        ["Q14", "DNS control for leanjust.com available for a staging hostname now and cutover at go-live?", "Staging and launch blocked", "P0"],
        ["Q15", "Privacy policy / PII handling for profile data (retention, deletion on request)?", "Legal/compliance gap at go-live", "P6"],
    ],
)

# ================= 10. Risks =================
h1("10. Risks and Mitigations")
table(
    ["Risk", "Likelihood", "Impact", "Mitigation"],
    [
        ["WeChat Open Platform approval delay", "High", "Medium", "Planned as fast-follow (Q4); go-live not blocked; Google/Microsoft/local ship first"],
        ["Marketing content not ready (5 industry pages, partner pages, demos)", "Medium", "High", "P0 content-intake checklist with per-page owners; pages ship as CMS-editable drafts if copy is late"],
        ["Design approval iterations ('ibm.com reference' is subjective)", "Medium", "Medium", "Q1 resolved before build; static design mockup approved at P1 gate before page production"],
        ["Data migration fidelity (Firestore + locale JSON -> bilingual MongoDB)", "Medium", "Medium", "P5 parity walkthrough with the old site kept running until sign-off"],
        ["Scope creep in the CMS (Phase 4)", "Medium", "Medium", "CMS MVP = topics + uploads + membership + audit; workflows/versioning explicitly out of scope for v1"],
        ["Single-server capacity for Next.js SSR + MongoDB + MinIO", "Low", "Medium", "Static generation for public pages; monitoring in P6; vertical headroom documented"],
        ["Key-person dependency (1-2 developers)", "Medium", "Medium", "CI, typed codebase, and this plan document reduce bus-factor; two bootstrap admins mandatory"],
    ],
)

# ================= 11. Approval =================
h1("11. Approval")
p("By approving this plan, the approver confirms: the target architecture (Section 4, decisions D1-D7), the phase sequence and ~14-week timeline (Section 6), the remediation approach for all 19 review issues (Section 7), and that open questions Q1-Q3, Q13 and Q14 will be answered before Phase 2 starts.")
table(
    ["Role", "Name", "Decision (Approve / Approve with changes / Reject)", "Date", "Signature"],
    [
        ["Project owner", "", "", "", ""],
        ["Marketing lead", "", "", "", ""],
        ["Technical lead", "", "", "", ""],
    ],
)

doc.save(OUT)
print("Saved:", OUT)
