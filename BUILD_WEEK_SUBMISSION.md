# OpenAI Build Week submission copy

## Project name

Options Learning Lab

## Elevator pitch

A bilingual options academy that turns lessons and historical market replays into risk-aware paper-trading practice with evidence-based coaching.

## About the project

### Inspiration

Options education has a missing middle. Beginners can memorize calls, puts, Greeks, and spreads, but still struggle to decide what to do when price structure, volatility, time decay, liquidity, and account risk collide. Most products either stop at static lessons or jump directly to a trading interface.

Options Learning Lab was built to connect those two worlds. It creates a deliberate-practice loop where a learner studies a concept, applies it inside a compressed historical trading day, manages a virtual position, and receives a process review that does not confuse luck with skill.

### What it does

The product combines a structured options curriculum, scenario-based questions, a historical replay terminal, a modeled option chain, and a configurable paper account. Learners can switch among 1-, 5-, and 15-minute candlestick views, draw on the chart, control playback speed, write a trade thesis and invalidation rule, submit limit orders, and practice defined-risk structures.

The simulator tracks whether the learner checked a higher timeframe, left chart evidence, wrote a plan, evaluated risk, and closed every position or order. The final review scores those behaviors separately from profit and loss. Eleven scenarios are freely accessible, so experienced users can skip ahead while true beginners can follow the recommended learning path.

The entire experience is available in English and Chinese. A first-visit language chooser defaults to English, and the persistent switch remains available throughout the product.

### How I built it

I built the application with React, TypeScript, vinext, Vite, and a Cloudflare-compatible deployment through OpenAI Sites. The replay engine aggregates minute bars into multiple timeframes, advances them at adjustable speed, and prevents rewinding after a decision to reduce look-ahead bias. The order model supports working limit orders, position sizing, stops, profit targets, timed exits, daily loss limits, and forced end-of-day cleanup.

I used Codex and GPT-5.6 throughout the Build Week refinement cycle to translate my original product vision into code, critique the experience from learner and professional-coach perspectives, design safeguards, implement the simulator and bilingual interface, validate builds, and deploy production iterations. Important Codex-assisted decisions I made included opening every learning scenario, separating process quality from P/L, requiring written invalidation before order entry, blocking final reviews while risk remains unresolved, and clearly labeling modeled option quotes.

### Challenges I ran into

My hardest challenge was avoiding false realism. Recent underlying minute bars can make a simulator look authoritative even when historical option quotes are modeled. The product therefore labels data provenance, treats quotes as teaching estimates, and avoids implying that modeled fills were available in the real market.

Another challenge I faced was coaching without hindsight. The system records the evidence available when a decision is made, prevents backward time travel after decisions, and evaluates planning and discipline rather than simply rewarding profitable outcomes.

### Accomplishments I'm proud of

I turned a broad nontechnical product vision into a functioning bilingual simulator with a coherent curriculum, historical replay, multi-timeframe charts, modeled strategy construction, a realistic order lifecycle, configurable risk controls, and evidence-based review.

The product is intentionally honest: recommendations do not become restrictions, profitability does not prove decision quality, and modeled option prices are not presented as historical truth.

### What I learned

I learned that the strongest learning product is not the one with the most strategies. It is the one that repeatedly asks the learner to connect a market thesis to a bounded-risk expression, define what would prove the thesis wrong, and review the decision without outcome bias.

### What's next

Next steps include licensed historical minute-level option chains, richer multi-leg strategy construction, adaptive quizzes based on repeated mistakes, and a coach that compares a learner's decision against multiple defensible alternatives rather than presenting one perfect hindsight answer.

## Built with tags

React, TypeScript, Next.js, vinext, Vite, Tailwind CSS, OpenAI Sites, Codex, GPT-5.6

## Demo URL

https://options-learning-lab.mauve-spoon-3156.chatgpt.site

## Judge instructions

No credentials are required. Choose a language, select any experience level, open Scenario 01, inspect multiple chart timeframes, add a chart annotation, write a trade plan, submit a paper limit order, advance the replay, resolve open risk, and review the resulting process score.

## Three-minute demo outline

1. **0:00–0:20 — Problem:** explain the gap between options vocabulary and real-time judgment.
2. **0:20–0:45 — Product:** show language selection, open curriculum, and unlocked scenarios.
3. **0:45–1:45 — Practice:** switch chart timeframes, draw a level, accelerate replay, inspect the option chain, write a plan, and place a paper order.
4. **1:45–2:10 — Coaching:** show risk limits, order lifecycle, and the evidence-based review.
5. **2:10–2:45 — Codex and GPT-5.6:** explain how Codex converted the brief into the simulator, challenged product decisions, built the bilingual layer, and enforced safeguards against hindsight and false precision.
6. **2:45–3:00 — Close:** state the Education-track goal: deliberate practice before real capital.
