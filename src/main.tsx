import React from "react";
import { createRoot } from "react-dom/client";
import {
  BatteryCharging,
  Blocks,
  HeartHandshake,
  Lightbulb,
  MousePointer2,
  Orbit,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import "./styles.css";

type Accent = "blue" | "orange" | "yellow" | "green" | "pink" | "purple";

type Project = {
  title: string;
  subtitle: string;
  accent: Accent;
  preview: "calendar" | "board" | "news" | "lab";
  image: string;
  tags: string[];
  intention: string;
  ux: string;
  outcome: string;
  icon: React.ElementType;
  href: string;
};

const accents: Record<Accent, { bg: string; ink: string; depth: string; soft: string }> = {
  blue: { bg: "#3b82f6", ink: "#ffffff", depth: "#1d4ed8", soft: "#dbeafe" },
  orange: { bg: "#fb923c", ink: "#3b1900", depth: "#c2410c", soft: "#ffedd5" },
  yellow: { bg: "#facc15", ink: "#3a2a00", depth: "#ca8a04", soft: "#fef9c3" },
  green: { bg: "#34d399", ink: "#042f20", depth: "#059669", soft: "#d1fae5" },
  pink: { bg: "#f472b6", ink: "#ffffff", depth: "#db2777", soft: "#fce7f3" },
  purple: { bg: "#a78bfa", ink: "#ffffff", depth: "#7c3aed", soft: "#ede9fe" },
};

const navItems = ["About", "Projects", "Skills", "Vision", "Contact"];

const projects: Project[] = [
  {
    title: "ToDo Calendar",
    subtitle: "毎日のタスクを、触りたくなる予定表へ。",
    accent: "blue",
    preview: "calendar",
    image: "/assets/generated/project-01-card-redesign.png",
    tags: ["React", "TypeScript", "Vite", "Local state"],
    intention:
      "予定とToDoが別々になる小さな不便を、学生の生活リズムに沿って整理するためのカレンダーUI。",
    ux: "進捗リング、繰り返しタスク、目標入力を一画面にまとめ、達成感が見える導線を意識。",
    outcome: "タスク管理を作業ではなく、今日を組み立てる感覚に近づけることを目指しました。",
    icon: BatteryCharging,
    href: "https://github.com/Tanaka2006/ToDo",
  },
  {
    title: "Campus Board",
    subtitle: "学生同士の情報交換を、安心して使える場所に。",
    accent: "orange",
    preview: "board",
    image: "/assets/generated/project-02-card-redesign.png",
    tags: ["React Native", "Expo", "Search", "Reviews"],
    intention:
      "授業や教授に関する情報が散らばる課題に対して、必要な人が必要な時に探せる掲示板を構想。",
    ux: "投稿、検索、ランキング、ログインを想定し、信頼できる情報に早くたどり着ける体験を設計。",
    outcome: "学生目線の不安や迷いを減らす、生活に近いプロダクトとして育てています。",
    icon: HeartHandshake,
    href: "https://github.com/Tanaka2006/keizibannzaka25",
  },
  {
    title: "jijii_news",
    subtitle: "通知が届く瞬間まで、体験として設計する。",
    accent: "green",
    preview: "news",
    image: "/assets/generated/project-03-card-redesign.png",
    tags: ["Next.js", "Web Push", "Vercel KV", "PWA"],
    intention:
      "情報を開きに行く前提ではなく、必要なニュースが自然に届く流れをWeb Pushで実験。",
    ux: "スマホ閲覧、通知許可、再訪問の心理的ハードルまで含めて、軽い接点を大切にしました。",
    outcome: "フロントエンドだけでなく、通知というプロダクト体験の入口を学ぶ制作です。",
    icon: Zap,
    href: "https://github.com/Tanaka2006/jijii_news",
  },
  {
    title: "Arupaka Calendar",
    subtitle: "予定管理に、少しだけ愛着が生まれる操作感を。",
    accent: "pink",
    preview: "lab",
    image: "/assets/generated/project-04-card-redesign.png",
    tags: ["Next.js", "TypeScript", "Calendar", "UI logic"],
    intention:
      "カレンダー操作の分かりやすさと、画面を開きたくなる親しみやすさを両立する練習として制作。",
    ux: "日付選択、状態表示、予定の見え方を整理し、迷わず触れる情報密度を探りました。",
    outcome: "機能の正しさだけでなく、使っている時の気分まで作れるエンジニアを目指す一歩です。",
    icon: Orbit,
    href: "https://github.com/Tanaka2006/Arupaka_calendar_web",
  },
];

const strengths = [
  { label: "観察", text: "使う人の小さな迷いを拾い、UIの形に戻す。", icon: MousePointer2, accent: "blue" as Accent },
  { label: "実装", text: "React / TypeScriptで、触って分かる状態を早く作る。", icon: Blocks, accent: "green" as Accent },
  { label: "感情", text: "便利さだけでなく、操作後の気持ちよさまで考える。", icon: Sparkles, accent: "pink" as Accent },
];

const skills = [
  ["Frontend", "React", "TypeScript", "Next.js", "Vite", "Tailwind CSS"],
  ["Mobile / App", "React Native", "Expo", "PWA", "Web Push", "LocalStorage"],
  ["Experience", "UI設計", "プロトタイピング", "情報設計", "マイクロインタラクション", "改善観察"],
  ["Engineering", "GitHub", "API連携", "状態管理", "アクセシビリティ", "README整理"],
];

const processSteps = [
  { title: "Problem", text: "誰の、どんな場面の、どんな小さな詰まりを減らしたいかを言葉にする。" },
  { title: "Prototype", text: "画面と操作を先に触れる形へ。気持ちよいフィードバックがあるか確認する。" },
  { title: "Polish", text: "動き、余白、文言、状態表示を整えて、使う前より少し前向きな体験にする。" },
];

const studioNotes = [
  { label: "Design", value: "触って分かるUI", accent: "pink" as Accent },
  { label: "Build", value: "Reactで早く形に", accent: "blue" as Accent },
  { label: "Care", value: "使う人の気分まで", accent: "green" as Accent },
];

const HEXES = "3b82f61d4ed822c55e15803def4444b91c1cff6a00cc5500ffc800cca00014b8a60f766edb3b7cb02e649356d46b3fa13341551e293bffbf00cc9900ffffffd3e2ef".match(
  /.{6}/g,
) as string[];

const BUTTON_COLORS = {
  blue: 0,
  green: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  teal: 5,
  pink: 6,
  purple: 7,
  slate: 8,
  amber: 9,
  white: 10,
} as const;

type ButtonColor = keyof typeof BUTTON_COLORS;

const buttonCanvasContext =
  typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d");

function squirclePath(width: number, height: number, radius: number, x = 0, y = 0, path = "") {
  for (let side = 0; side < 4; side += 1) {
    for (let step = 0; step < 31; step += 1) {
      const angle = ((side + step / 30) * Math.PI) / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const pointX =
        x +
        (cos > 0 ? width - radius : radius) +
        Math.sign(cos) * Math.pow(Math.abs(cos), 0.6) * radius;
      const pointY =
        y +
        (sin > 0 ? height - radius : radius) +
        Math.sign(sin) * Math.pow(Math.abs(sin), 0.6) * radius;
      path += `${side || step ? "L" : "M"}${pointX} ${pointY}`;
    }
  }

  return `${path}Z`;
}

function TactileButton({
  children,
  accent = "blue",
  href,
  icon = "",
  size = 44,
  square = false,
  floating = false,
}: {
  children?: React.ReactNode;
  accent?: ButtonColor;
  href: string;
  icon?: string;
  size?: number;
  square?: boolean;
  floating?: boolean;
}) {
  const [pressed, setPressed] = React.useState(false);
  const id = React.useId().replace(/:/g, "").toLowerCase();
  const label = String(children ?? "").toUpperCase();
  const colorIndex = BUTTON_COLORS[accent] ?? 0;
  const brightHex = HEXES[colorIndex * 2];
  const darkHex = HEXES[colorIndex * 2 + 1];
  const isWhite = accent === "white";
  const colorMix = (hex: string, pct: number, mixWith: string) => `color-mix(in srgb, #${hex} ${pct}%, ${mixWith})`;
  const highlight = colorMix(brightHex, 70, "white");
  const shadow = colorMix(darkHex, 35, "black");
  const scale = size / 40;

  if (buttonCanvasContext) {
    buttonCanvasContext.font = "900 15px system-ui";
  }

  const measured = buttonCanvasContext?.measureText(label).width ?? label.length * 9;
  const width = square ? 48 : Math.ceil((measured + (icon ? 100 : 80)) * 1.1);
  const faceY = 4 + (pressed ? 5 : 0);
  const baseY = 12;
  const gradientEdge = Math.min(0.5, 20 / width);
  const dropY = floating ? 24 - (pressed ? 12 : 0) : 4 - (pressed ? 2 : 0);
  const stdDeviation = floating ? 12 - (pressed ? 6 : 0) : 3 - (pressed ? 1.5 : 0);
  const opacity = floating ? 0.15 : 0.3;
  const svgWidth = (width + 10) * scale;
  const svgHeight = 60 * scale;

  return (
    <motion.a
      aria-label={label || icon}
      className="codepen-button no-select"
      href={href}
      style={{ width: svgWidth, height: svgHeight }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      whileHover={{ scale: floating ? 1.06 : 1.03 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
    >
      <svg viewBox={`0 0 ${width + 10} 60`} aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <filter id={`b${id}`} x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dy={dropY} stdDeviation={stdDeviation} floodColor={shadow} floodOpacity={opacity} />
          </filter>
          <linearGradient id={`g${id}`}>
            <stop offset="0" stopColor={colorMix(darkHex, 65, "white")} />
            <stop offset={gradientEdge} stopColor={colorMix(darkHex, 90, "white")} />
            <stop offset={1 - gradientEdge} stopColor={colorMix(darkHex, 90, "white")} />
            <stop offset="1" stopColor={colorMix(darkHex, 65, "white")} />
          </linearGradient>
        </defs>
        <path d={squirclePath(width, 40, 18, 5, baseY)} fill={colorMix(darkHex, 60, "black")} filter={`url(#b${id})`} />
        <path
          d={squirclePath(width, 40, 18, 5, baseY)}
          fill={colorMix(darkHex, 80, "black")}
          stroke={floating ? highlight : colorMix(darkHex, 50, "black")}
          strokeWidth="1"
        />
        {Array.from({ length: Math.max(0, baseY - faceY) }).map((_, index) => (
          <path key={index} d={squirclePath(width, 40, 18, 5, faceY + 1 + index)} fill={`url(#g${id})`} />
        ))}
        <path
          d={squirclePath(width, 40, 18, 5, faceY)}
          fill={isWhite ? "#fff" : `#${brightHex}`}
          stroke={isWhite ? "#e2e8f0" : highlight}
          strokeWidth="1.5"
        />
        <text
          x={5 + width / 2}
          y={20 + faceY}
          textAnchor="middle"
          dominantBaseline="central"
          fill={isWhite ? "#3b82f6" : "#fff"}
          style={{ pointerEvents: "none", fontWeight: 900 }}
        >
          {icon ? (
            <tspan style={{ fontFamily: "Material Icons", fontSize: square ? "26px" : "20px" }} dy="1">
              {icon}
            </tspan>
          ) : null}
          {!square ? (
            <tspan
              dx={icon ? 8 : 0}
              dy="0"
              fontSize="15"
              style={{ letterSpacing: 1, fontFamily: "system-ui" }}
            >
              {label}
            </tspan>
          ) : null}
        </text>
      </svg>
    </motion.a>
  );
}

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p>{kicker}</p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </motion.div>
  );
}

function ProjectPreview({ type }: { type: Project["preview"] }) {
  if (type === "calendar") {
    return (
      <div className="preview-ui preview-calendar">
        <div className="calendar-month-card">
          <div className="calendar-title-row">
            <span>‹</span>
            <strong>May 2026</strong>
            <span>›</span>
          </div>
          <div className="calendar-week-row">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-ring-row">
            {[18, 19, 20, 21, 22].map((day, index) => (
              <div key={day} className={index === 1 ? "day-ring is-today" : "day-ring"}>
                <i />
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="completion-badge" aria-label="Completion Rate 52%">
          <div className="completion-ring">
            <span>52%</span>
          </div>
          <small>Completion</small>
        </div>

        <div className="task-float-card">
          <div className="task-date-row">
            <span>‹</span>
            <strong>May, 18</strong>
            <span>›</span>
          </div>
          <div>
            <label>
              <i />
              新しい項目
            </label>
            <label className="is-done">
              <i />
              新しい項目
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (type === "board") {
    return (
      <div className="preview-ui preview-board">
        <div className="search-pill">
          <span />
          授業を探す
        </div>
        <div className="board-list">
          {["教授レビュー", "課題の量", "おすすめ"].map((item, index) => (
            <div key={item} className="board-row">
              <strong>0{index + 1}</strong>
              <span>{item}</span>
              <i />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "news") {
    return (
      <div className="preview-ui preview-news">
        <div className="phone-shell">
          <div className="notify-card">
            <span />
            <div>
              <strong>News Push</strong>
              <small>必要な情報だけ届く</small>
            </div>
          </div>
          <div className="toggle-track">
            <span />
          </div>
          <div className="wave-row">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-ui preview-lab">
      <div className="circuit-board">
        <span className="node-a" />
        <span className="node-b" />
        <span className="node-c" />
        <i />
      </div>
      <div className="lab-controls">
        <span />
        <span />
        <span />
      </div>
      <strong>Interaction Tune</strong>
    </div>
  );
}

function MagneticProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(springY, [-22, 22], [2.5, -2.5]);
  const rotateY = useTransform(springX, [-22, 22], [-2.5, 2.5]);
  const color = accents[project.accent];

  return (
    <motion.article
      className="project-card"
      style={
        {
          "--accent": color.bg,
          "--accent-soft": color.soft,
          "--accent-depth": color.depth,
          x: springX,
          y: springY,
          rotateX,
          rotateY,
        } as unknown as React.CSSProperties & MotionStyle
      }
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) / 18);
        y.set((event.clientY - rect.top - rect.height / 2) / 22);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -8 }}
    >
      <a className="project-visual-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
        <img className="project-card-visual" src={project.image} alt={`${project.title} portfolio visual`} />
      </a>
    </motion.article>
  );
}

function App() {
  return (
    <div className="site-shell">
      <div className="noise-layer" />
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="トップへ">
          <span>TNK</span>
          <strong>Interaction Portfolio</strong>
        </a>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <motion.div
              className="hero-burst"
              animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              touch<br />first
            </motion.div>
            <motion.p
              className="kicker-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Electrical & Electronic Engineering Student / UI Explorer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              触れた瞬間、
              <br />
              少し楽しくなる
              <br />
              UIをつくる。
            </motion.h1>
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
            >
              電気電子工学を学びながら、
              <br />
              UI/UX、フロントエンド、のように
              <br />
              触って楽しいプロダクト体験を探求しています。
              <br />
              <br />
              機能を並べるだけではなく、
              <br />
              “使いたくなる理由”
              <br />
              までデザインしたいと思っています。
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
            >
              <TactileButton href="#projects" accent="blue" icon="play_arrow">
                作品を触る
              </TactileButton>
              <TactileButton href="https://github.com/Tanaka2006" accent="yellow" icon="code">
                GitHub
              </TactileButton>
            </motion.div>
            <motion.div
              className="studio-notes"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
            >
              {studioNotes.map((note) => {
                const color = accents[note.accent];
                return (
                  <span
                    key={note.label}
                    style={{ "--note": color.bg, "--note-soft": color.soft } as React.CSSProperties}
                  >
                    <strong>{note.label}</strong>
                    {note.value}
                  </span>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            className="hero-gadget"
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.12 }}
          >
            <img src="/assets/generated/hero-interaction-ui.png" alt="触って楽しいUIパーツが並ぶポートフォリオのヒーロービジュアル" />
          </motion.div>
        </section>

        <section className="about-section" id="about">
          <SectionTitle
            kicker="About Me"
            title="電気電子の視点と、触れるUIへの好奇心。"
            text="ポートフォリオでは、技術名だけではなく、なぜ作ったのか、どう使いやすくしたのか、次にどう改善するのかを見えるようにしています。"
          />
          <div className="about-grid">
            <motion.div
              className="profile-panel"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="avatar-disc">
                <img src="https://github.com/Tanaka2006.png" alt="Tanaka2006 GitHub avatar" />
              </div>
              <div>
                <p className="mini-label">Japanese University Student</p>
                <h3>Tanaka2006</h3>
                <p>
                  学生生活の中で見つけた不便や、毎日使う画面の小さな違和感を、アプリやWeb UIとして試作しています。
                  電気電子工学で学ぶ仕組みへの関心と、触った時の気持ちよさをつなげる制作が好きです。
                </p>
              </div>
            </motion.div>
            <div className="strength-grid">
              {strengths.map((item, index) => {
                const Icon = item.icon;
                const color = accents[item.accent];
                return (
                  <motion.article
                    key={item.label}
                    className="strength-card"
                    style={{ "--accent": color.bg, "--accent-soft": color.soft } as React.CSSProperties}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    whileHover={{ y: -8, rotate: index % 2 ? 1.5 : -1.5 }}
                  >
                    <span>
                      <Icon size={22} />
                    </span>
                    <h3>{item.label}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <SectionTitle
            kicker="Selected Projects"
            title="作った画面の温度まで、伝わるように。"
            text="AI風の飾りではなく、実際に作っている機能を小さなUIとして再構成。課題、触り心地、改善意図が一緒に見えるカードにしました。"
          />
          <div className="project-stack">
            {projects.map((project, index) => (
              <MagneticProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills">
          <SectionTitle
            kicker="Skills"
            title="技術を、体験を組み立てる部品として使う。"
            text="実装、観察、改善のサイクルを回しながら、気持ちよく使えるプロダクトに近づけます。"
          />
          <div className="skill-console">
            {skills.map(([title, ...items], groupIndex) => (
              <motion.div
                className="skill-group"
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.07, duration: 0.5 }}
              >
                <h3>{title}</h3>
                <div>
                  {items.map((item, itemIndex) => (
                    <motion.span
                      key={item}
                      whileHover={{
                        y: -5,
                        rotate: itemIndex % 2 ? 2 : -2,
                        backgroundColor: accents[["blue", "orange", "yellow", "green", "pink", "purple"][itemIndex % 6] as Accent].soft,
                      }}
                      whileTap={{ scale: 0.94 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="vision-section" id="vision">
          <SectionTitle
            kicker="Vision / Future"
            title="問題を解くだけでなく、使う人の次の行動を軽くする。"
            text="将来は、技術とデザインを横断して、暮らしや学びの中の小さな摩擦を楽しい体験へ変えられる人になりたいです。"
          />
          <div className="process-track">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="process-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
          <motion.div
            className="future-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Lightbulb size={28} />
            <p>
              今後は、実機で触れるモバイル体験、通知やセンサーを使ったプロダクト、そしてマイクロインタラクションの質をさらに深めます。
              「便利だから使う」から「気持ちいいから続く」へ、体験の理由まで設計していきます。
            </p>
          </motion.div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="mini-label">Contact</p>
            <h2>一緒に、触りたくなる画面を考えたいです。</h2>
            <p>
              UI/UX、フロントエンド、学生向けアプリ、ガジェット的なプロダクト体験に関心があります。
              制作物やコードはGitHubで更新しています。
            </p>
          </div>
          <div className="contact-actions">
            <TactileButton href="https://github.com/Tanaka2006" accent="purple" icon="code">
              GitHubを見る
            </TactileButton>
            <TactileButton href="mailto:hello@example.com" accent="orange" icon="mail">
              Contact
            </TactileButton>
          </div>
          <motion.div className="rocket-badge" whileHover={{ rotate: 8, scale: 1.06 }} whileTap={{ scale: 0.94 }}>
            <Rocket size={36} />
          </motion.div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
