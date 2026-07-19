# Options Learning Lab

Options Learning Lab is a bilingual, browser-based learning and paper-trading environment designed to help a beginner build practical options judgment before risking real capital.

**Live demo:** https://options-learning-lab.mauve-spoon-3156.chatgpt.site

## What it does

- Teaches options from first principles through structured lessons and knowledge checks.
- Provides 11 freely accessible training scenarios instead of forcing a single linear path.
- Replays full trading days with 1-, 5-, and 15-minute candlestick views and adjustable playback speed.
- Includes drawing tools, VWAP, timeframe analysis, a modeled option chain, single-leg calls, and defined-risk vertical spreads.
- Uses a configurable paper account with position sizing, daily loss limits, working limit orders, stops, targets, and forced end-of-day exits.
- Produces evidence-based reviews that score planning, analysis, risk checks, and exit discipline separately from P/L.
- Supports English and Chinese, with a first-visit language chooser and a persistent language switch.

## Why it exists

Most beginner options products teach vocabulary or provide a trading ticket, but leave a gap between knowing a strategy and making a defensible decision under time pressure. Options Learning Lab turns that gap into a repeatable practice loop:

1. Learn the concept.
2. Make a decision in a historical scenario.
3. Record the thesis, invalidation, and risk.
4. Execute in a paper account.
5. Review the quality of the process rather than celebrating or punishing the outcome alone.

## How Codex and GPT-5.6 were used

This product was developed through an iterative Codex workflow, with GPT-5.6 used as the reasoning and implementation partner during the Build Week refinement cycle.

Codex helped to:

- turn a nontechnical product brief into a working interactive application;
- challenge the first demo from both the learner and professional-coach perspectives;
- design the curriculum, scenario taxonomy, risk controls, and evidence-based review model;
- implement the React/vinext interface, replay engine, candlestick aggregation, modeled option chain, order lifecycle, and bilingual experience;
- identify product risks such as false precision, look-ahead bias, unresolved positions, misleading performance scores, and locked learning paths;
- source and integrate five recent SPY minute-bar replay days while clearly separating real underlying data from modeled historical option prices;
- repeatedly build, validate, and deploy production versions while preserving the working product.

Key decisions made with Codex included keeping all scenarios open, separating decision quality from P/L, preventing time travel after a trade decision, enforcing a written plan before orders, and labeling modeled option prices rather than presenting them as real fills.

## Data and safety disclosure

This is an educational simulator, not a brokerage or investment-advice service. Five SPY scenarios use historical one-minute underlying bars sourced during development; older SPX scenarios and all historical option-chain prices are teaching models. Modeled quotes do not represent guaranteed or actual executable prices.

## Test the project

1. Open the [live demo](https://options-learning-lab.mauve-spoon-3156.chatgpt.site).
2. Choose English or Chinese.
3. Select a starting experience level; this changes recommendations but does not lock content.
4. Open any scenario from 01 through 11.
5. Switch among the 1-, 5-, and 15-minute charts and add a chart annotation.
6. Write a trade plan, inspect the option chain, and submit a paper limit order.
7. Advance the replay, resolve all positions and orders, then open the evidence-based review.
8. Visit Learning Path and Training Report to inspect the curriculum and saved process metrics.

No account or test credentials are required. Preferences and training history are stored locally in the browser.

## Local setup

Prerequisite: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run start
```

## Technology

- React 19
- Next.js-compatible vinext runtime
- TypeScript
- Vite
- Tailwind CSS
- Cloudflare-compatible deployment through OpenAI Sites
- Browser-local persistence for learning preferences and training records

## Repository map

- `app/page.tsx` — product experience, simulator, curriculum, orders, and reviews
- `app/TradingChart.tsx` — candlestick rendering, aggregation, and chart interactions
- `app/marketData.ts` — training scenario data
- `app/i18n.ts` — English/Chinese translation layer
- `app/globals.css` — responsive interface styling

## Build Week track

**Education** — the primary audience is a learner developing options decision-making and risk-management skills.
