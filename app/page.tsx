"use client";

import { useEffect, useMemo, useState } from "react";

const candles = Array.from({ length: 54 }, (_, i) => {
  const drift = i < 12 ? i * 1.25 : i < 25 ? 15 - (i - 12) * 0.8 : i < 38 ? 5 + (i - 25) * 1.05 : 18 - (i - 38) * 0.42;
  const wave = Math.sin(i * 0.82) * 3.1;
  const open = 5642 + drift + wave;
  const close = open + Math.sin(i * 1.71) * 3.9;
  return { open, close, high: Math.max(open, close) + 2.2 + (i % 3), low: Math.min(open, close) - 2 - ((i + 1) % 3) };
});

const chain = [
  { strike: 5620, delta: ".78", bid: "31.10", ask: "32.20", iv: "18.4%", put: "4.10" },
  { strike: 5630, delta: ".66", bid: "22.60", ask: "23.40", iv: "17.9%", put: "6.70" },
  { strike: 5640, delta: ".53", bid: "15.40", ask: "16.10", iv: "17.2%", put: "10.20" },
  { strike: 5650, delta: ".39", bid: "9.60", ask: "10.20", iv: "16.8%", put: "15.10" },
  { strike: 5660, delta: ".27", bid: "5.40", ask: "5.90", iv: "17.3%", put: "21.60" },
];

const modules = [
  ["01", "期权语言", "权利、义务与合约乘数", "完成"],
  ["02", "价格怎么动", "内在价值、时间价值与波动率", "完成"],
  ["03", "单腿策略", "Long Call / Put 与风险边界", "进行中"],
  ["04", "垂直价差", "方向、成本与收益上限", "待解锁"],
  ["05", "蝶式与鹰式", "用结构表达区间观点", "待解锁"],
  ["06", "0DTE 实战", "时间衰减、流动性与纪律", "待解锁"],
];

export default function Home() {
  const [view, setView] = useState<"sim" | "learn" | "quiz">("sim");
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [cursor, setCursor] = useState(31);
  const [selected, setSelected] = useState(5640);
  const [cash, setCash] = useState(25000);
  const [position, setPosition] = useState(0);
  const [review, setReview] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setCursor((v) => (v >= candles.length ? 1 : v + 1)), 850 / speed);
    return () => window.clearInterval(timer);
  }, [playing, speed]);

  const price = candles[Math.max(0, cursor - 1)].close;
  const chart = useMemo(() => candles.slice(0, cursor), [cursor]);
  const selectedRow = chain.find((row) => row.strike === selected)!;
  const timeMinutes = Math.min(389, Math.round((cursor / candles.length) * 390));
  const hour = 9 + Math.floor((30 + timeMinutes) / 60);
  const minute = (30 + timeMinutes) % 60;
  const simTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

  const buy = () => {
    const cost = Number(selectedRow.ask) * 100;
    if (cash >= cost) { setCash((v) => v - cost); setPosition((v) => v + 1); }
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">Δ</span><span>期权研习社<small>OPTIONS LAB</small></span></div>
        <nav aria-label="主导航">
          <button className={view === "sim" ? "active" : ""} onClick={() => setView("sim")}><span>⌁</span>历史回放</button>
          <button className={view === "learn" ? "active" : ""} onClick={() => setView("learn")}><span>◫</span>学习路径</button>
          <button className={view === "quiz" ? "active" : ""} onClick={() => setView("quiz")}><span>◇</span>情景训练</button>
        </nav>
        <div className="journey">
          <div className="journey-top"><span>当前等级</span><b>LV. 3</b></div>
          <strong>单腿探索者</strong>
          <div className="progress"><i /></div>
          <small>620 / 1,000 XP</small>
        </div>
        <div className="sidebar-foot"><span className="avatar">Y</span><div><b>训练账户</b><small>连续学习 6 天</small></div><button aria-label="设置">•••</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div><span className="eyebrow">{view === "sim" ? "实战训练 · HISTORICAL REPLAY" : view === "learn" ? "系统课程 · LEARNING PATH" : "判断训练 · SCENARIO DRILLS"}</span><h1>{view === "sim" ? "SPX 0DTE 历史回放" : view === "learn" ? "从零建立期权思维" : "把知识变成临场判断"}</h1></div>
          <div className="top-actions"><span className="streak">🔥 <b>6</b> 日连续</span><button className="ghost">学习手册</button></div>
        </header>

        {view === "sim" && <>
          <section className="session-strip">
            <div><span className="live-dot" /> <b>训练场景 03</b><small>历史样本 · 2024 年 7 月 15 日</small></div>
            <div className="mission"><span>今日目标</span><b>识别上午趋势，使用有限风险策略完成 1 笔交易</b></div>
            <div className="account"><span>账户净值</span><b>${(cash + position * Number(selectedRow.bid) * 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}</b><small className="positive">虚拟资金 · 风险自由</small></div>
          </section>

          <section className="terminal-grid">
            <div className="chart-panel panel">
              <div className="panel-head">
                <div className="symbol"><b>SPX</b><span>S&P 500 INDEX</span></div>
                <div className="quote"><b>{price.toFixed(2)}</b><span className="positive">+18.42&nbsp; +0.33%</span></div>
                <div className="timeframes"><button>1m</button><button className="selected">5m</button><button>15m</button><button>1h</button></div>
                <div className="data-tag">历史样本数据</div>
              </div>
              <div className="chart-area" aria-label="SPX 五分钟K线图">
                <div className="price-axis"><span>5670</span><span>5660</span><span>5650</span><span>5640</span><span>5630</span></div>
                <div className="grid-lines" />
                <div className="candles">
                  {chart.map((c, i) => {
                    const y = 100 - ((Math.max(c.open, c.close) - 5628) / 44) * 100;
                    const h = Math.max(4, (Math.abs(c.close - c.open) / 44) * 100);
                    const wickY = 100 - ((c.high - 5628) / 44) * 100;
                    const wickH = ((c.high - c.low) / 44) * 100;
                    const up = c.close >= c.open;
                    return <span key={i} className={`candle ${up ? "up" : "down"}`} style={{ left: `${(i / candles.length) * 100}%`, top: `${y}%`, height: `${h}%` }}><i style={{ top: `${wickY - y}%`, height: `${wickH}%` }} /></span>;
                  })}
                </div>
                <div className="vwap">VWAP 5647.82</div>
                <div className="chart-note"><b>观察</b><span>价格回踩 VWAP 后重新站稳。先判断结构，不急着下注。</span></div>
                <div className="time-axis"><span>09:30</span><span>11:00</span><span>12:30</span><span>14:00</span><span>16:00</span></div>
              </div>
              <div className="playback">
                <button className="round" onClick={() => setCursor(1)} aria-label="回到开盘">↶</button>
                <button className="play" onClick={() => setPlaying((v) => !v)}>{playing ? "Ⅱ" : "▶"}</button>
                <b>{simTime}:00 ET</b>
                <input aria-label="回放进度" type="range" min="1" max={candles.length} value={cursor} onChange={(e) => setCursor(Number(e.target.value))} />
                <div className="speed">{[1, 2, 4, 8].map((n) => <button key={n} className={speed === n ? "selected" : ""} onClick={() => setSpeed(n)}>{n}×</button>)}</div>
              </div>
            </div>

            <div className="coach-panel panel">
              <div className="coach-head"><div className="coach-icon">✦</div><div><b>AI 交易教练</b><span>实时观察你的决策过程</span></div><i>在线</i></div>
              <div className="coach-body">
                <span className="coach-time">{simTime} · 市场结构检查</span>
                <h3>现在你看到了什么？</h3>
                <p>SPX 开盘上冲后回踩。下单前，用三个证据验证你的方向。</p>
                <ol><li><b>趋势</b><span>5 分钟高点与低点是否抬高？</span></li><li><b>位置</b><span>价格在 VWAP 哪一侧？</span></li><li><b>风险</b><span>这笔交易失效的位置在哪里？</span></li></ol>
                <div className="hint"><span>提示</span>切换到 15 分钟图，避免把 5 分钟噪音误判成趋势。</div>
                <textarea aria-label="记录判断" placeholder="写下你的判断… 例如：趋势偏多，因为…" />
                <button className="outline">保存判断</button>
              </div>
            </div>
          </section>

          <section className="chain-panel panel">
            <div className="chain-head"><div><b>期权链</b><span>SPX · 0DTE · 2024/07/15</span></div><div className="chain-summary"><span>现价 <b>{price.toFixed(2)}</b></span><span>预期波动 <b>±28.4</b></span><span>IV Rank <b>31</b></span></div><button className="strategy-button">策略构建器 <span>→</span></button></div>
            <div className="chain-table">
              <div className="tr th"><span>CALL BID</span><span>ASK</span><span>DELTA</span><b>行权价</b><span>IV</span><span>PUT MID</span></div>
              {chain.map((row) => <button key={row.strike} className={`tr ${selected === row.strike ? "chosen" : ""}`} onClick={() => setSelected(row.strike)}><span>{row.bid}</span><span>{row.ask}</span><span>{row.delta}</span><b>{row.strike}</b><span>{row.iv}</span><span>{row.put}</span></button>)}
            </div>
            <div className="order-bar">
              <div><span>已选合约</span><b>SPX {selected} Call</b></div><div><span>限价参考</span><b>${selectedRow.ask}</b></div><div><span>最大风险</span><b>${(Number(selectedRow.ask) * 100).toLocaleString()}</b></div>
              <button className="buy" onClick={buy}>买入 1 张</button><button className="review-btn" onClick={() => setReview(true)}>结束并复盘</button>
            </div>
          </section>
        </>}

        {view === "learn" && <section className="learning-view">
          <div className="learning-hero"><span className="eyebrow">你的 8 周路线</span><h2>先理解风险，再学习收益。</h2><p>每一章都由短教程、判断题和历史行情任务组成。不是背策略名称，而是学会什么时候用、什么时候不用。</p><div className="hero-stats"><div><b>32%</b><span>总进度</span></div><div><b>14</b><span>已掌握概念</span></div><div><b>7</b><span>完成训练</span></div></div></div>
          <div className="module-list">{modules.map((m, i) => <button key={m[0]} className={i === 2 ? "current" : ""}><span className="module-num">{m[0]}</span><div><b>{m[1]}</b><small>{m[2]}</small></div><em>{m[3]}</em><span className="arrow">→</span></button>)}</div>
          <aside className="next-lesson"><span className="eyebrow">下一课 · 8 分钟</span><h3>买入看涨期权，不只是“看涨”</h3><p>方向看对，为什么仍然可能亏钱？用三个价格路径理解 Delta、Theta 和隐波。</p><div className="mini-payoff"><i /><i /><i /><i /><i /><i /></div><button>继续学习 →</button></aside>
        </section>}

        {view === "quiz" && <section className="quiz-view">
          <div className="quiz-card"><div className="quiz-progress"><span>情景 4 / 10</span><i><b /></i><span>难度：进阶</span></div><span className="eyebrow">0DTE · 开盘 45 分钟</span><h2>方向偏多，但你担心午前波动率回落。哪种表达更合理？</h2><p className="scenario">SPX 位于 VWAP 上方，5 分钟结构高低点抬高。IV 高于近 20 日中位数，你愿意承担最多 $500 风险。</p><div className="answers">{[["A","直接买入近平值 Call"],["B","构建看涨垂直价差"],["C","卖出裸 Put"],["D","买入宽跨式"]].map(([k, v]) => <button key={k} className={quizAnswer === k ? "picked" : ""} onClick={() => setQuizAnswer(k)}><b>{k}</b><span>{v}</span></button>)}</div>{quizAnswer && <div className={`feedback ${quizAnswer === "B" ? "correct" : ""}`}><b>{quizAnswer === "B" ? "判断正确" : "再想一步"}</b><p>{quizAnswer === "B" ? "看涨价差保留方向敞口，同时卖出的高行权价 Call 能部分抵消较高的隐波成本，并把最大亏损限定在净权利金。" : "你需要同时处理方向、隐波回落和最大风险三个条件。比较每个策略是否都满足。"}</p></div>}<button className="submit" disabled={!quizAnswer}>提交判断</button></div>
          <aside className="concept-card"><span>本题考点</span><h3>策略不是观点，<br/>而是观点的风险容器。</h3><ul><li>方向：偏多</li><li>波动率：可能回落</li><li>风险：必须封顶</li></ul><button onClick={() => setView("learn")}>复习垂直价差 →</button></aside>
        </section>}
      </section>

      {review && <div className="modal-backdrop" onClick={() => setReview(false)}><section className="review-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setReview(false)}>×</button><span className="eyebrow">训练复盘 · 2024/07/15</span><h2>你的方向判断不错，入场依据还可以更完整。</h2><div className="score-ring"><b>78</b><span>/ 100</span></div><div className="review-grid"><div><span>做对了</span><b>等待价格重回 VWAP 上方</b><p>没有在第一次快速上冲时追价，避免了高波动区间的错误入场。</p></div><div><span>待改进</span><b>缺少 15 分钟级别确认</b><p>你的记录只引用了 5 分钟结构。更高周期仍处于上午区间内部。</p></div><div><span>风险纪律</span><b>单笔最大风险偏高</b><p>本次合约成本占账户 6.4%。下次优先用垂直价差将风险控制在 2% 内。</p></div></div><button className="submit" onClick={() => setReview(false)}>保存复盘并完成训练</button></section></div>}
    </main>
  );
}
