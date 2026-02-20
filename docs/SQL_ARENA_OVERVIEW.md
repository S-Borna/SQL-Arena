# SQL Arena

**Interactive SQL Training Platform**
Active Development — Created by Said Borna

---

### What it does

SQL Arena is a hands-on training platform for learning SQL by writing SQL. No videos, no walls of text — you get an exercise, write the query, execute it against a real database, receive instant diagnostic feedback, and iterate until the solution is correct. The platform runs a full SQLite engine compiled to WebAssembly directly in the browser, meaning every query executes locally with zero backend latency and zero data leaving the user's machine. It ships 70+ structured exercises across six progressive difficulty levels — from basic SELECT to correlated subqueries — validated by a custom coach engine that analyzes query output, detects 15+ categories of common mistakes, and delivers targeted Swedish-language feedback without relying on AI. Beyond the core arena, the platform includes a database design studio for visual normalization exercises (1NF through 3NF and many-to-many), a sandbox lab for free-form experimentation with export to SQLite/MySQL/PostgreSQL, a complete SQL reference system with flashcards and quizzes covering 65+ concepts, and a mystery-solving mode built on the Hanukkah of Data dataset — eight puzzles that require combining techniques to extract answers from real-world messy data.

### How it's built

The platform is a single-page React 19 application written in TypeScript, styled with Tailwind CSS 4, and bundled with Vite 7. The SQL execution layer is powered by sql.js — SQLite compiled to WebAssembly — which loads seed databases into memory and runs queries client-side with sub-millisecond response times. The code editor uses CodeMirror 6 with SQL syntax highlighting and autocomplete. Authentication and progress persistence are handled through Cloudflare D1 (edge SQLite) with a session-based auth model, while the application itself is deployed on Cloudflare Pages for global edge delivery. The codebase is approximately 8,000 lines of TypeScript across a clean separation of concerns: engine layer (query execution and diagnostic validation), data layer (exercises, seed databases, course goal mappings), component layer (editor, results table, schema panel), and view layer (arena, labs, design studio, roadmap, cheat sheet). A companion Python CLI module provides additional database exercises for programmatic data access, covering the Python-specific course goals.

### Why it exists

SQL education tools fall into two categories: passive platforms that show you queries and ask you to memorize them, and enterprise sandboxes that assume you already know what you're doing. Neither serves the student who needs to build real muscle memory through structured, progressive practice with immediate feedback. SQL Arena was built to fill that gap — a training environment designed specifically for students preparing for exams and professionals refreshing their skills, where the focus is on writing queries, not watching someone else write them. Every exercise maps to formal course objectives, the difficulty curve is intentional, and the feedback loop is measured in milliseconds — not in waiting for a grader or an AI to respond.

### Vision

SQL Arena is being built with the ambition to become a market-competitive, full-scale SQL training product. The platform is under active development with a clear trajectory: expand the exercise library to 200+ exercises covering advanced topics like window functions, CTEs, recursive queries, and transaction isolation levels. Introduce multi-dialect support so users can toggle between SQLite, MySQL, and PostgreSQL syntax in the same environment. Add multiplayer arena mode for classroom and team-based competitive training. Build an analytics dashboard that tracks learning velocity, identifies weak areas, and generates personalized practice plans. The goal is not to be another tutorial site — it is to be the definitive hands-on platform where anyone, from first-semester student to senior engineer switching stacks, comes to get genuinely good at SQL through deliberate practice at scale.

### Current state

The platform is live at sql.saidborna.com and actively used. The core training loop — exercises, diagnostics, progression — is production-stable. The exercise library covers 70+ exercises across three curated databases (e-commerce, Chinook, Hanukkah of Data) with full hint and solution support. The design studio, sandbox lab, cheat sheet, flashcard system, quiz mode, and roadmap tracker are all functional and deployed. Authentication with persistent progress tracking is operational via Cloudflare D1. Development continues with a focus on expanding content coverage, adding multi-dialect query execution, and building the competitive features that will differentiate SQL Arena in a crowded but underserving market.

---

<p align="center"><strong>sql.saidborna.com</strong><br>saidborna.com</p>
