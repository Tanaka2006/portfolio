import React from "react";
import { createRoot } from "react-dom/client";
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

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number | string };

function LineIcon({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const BatteryCharging = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
    <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
    <path d="m11 7-3 5h4l-3 5" />
    <path d="M22 11v2" />
  </LineIcon>
);

const Blocks = (props: IconProps) => (
  <LineIcon {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
  </LineIcon>
);

const HeartHandshake = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M19.5 12.5 12 20l-7.5-7.5a5 5 0 0 1 7-7l.5.5.5-.5a5 5 0 0 1 7 7Z" />
    <path d="m8 12 2 2 4-4" />
  </LineIcon>
);

const Lightbulb = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M8.5 14.5a6 6 0 1 1 7 0c-.7.5-.9 1.3-.9 2H9.4c0-.7-.2-1.5-.9-2Z" />
  </LineIcon>
);

const MousePointer2 = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="m4 3 7.5 18 2.5-7 7-2.5Z" />
  </LineIcon>
);

const Orbit = (props: IconProps) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="3" />
    <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-28 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(28 12 12)" />
  </LineIcon>
);

const Rocket = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M4.5 16.5c-1.3 1.1-2 2.7-2 5 2.3 0 3.9-.7 5-2" />
    <path d="M9 15 6 12c2.3-5.4 6.9-8.8 13.5-9.5-.7 6.6-4.1 11.2-9.5 13.5Z" />
    <path d="M9 15 7.5 20l5-1.5" />
    <circle cx="15" cy="7.5" r="1.5" />
  </LineIcon>
);

const Sparkles = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    <path d="m5 3 .7 2.3L8 6l-2.3.7L5 9l-.7-2.3L2 6l2.3-.7Z" />
    <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" />
  </LineIcon>
);

const Zap = (props: IconProps) => (
  <LineIcon {...props}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />
  </LineIcon>
);

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
    subtitle: "達成感が、少しずつ積み上がるToDo体験。",
    accent: "blue",
    preview: "calendar",
    image: "/assets/generated/project-01-app-visual.png",
    tags: ["React", "TypeScript", "Vite", "UI/UX"],

    intention:
      "『ToDoが続かない』という感覚に対して、タスク管理を“継続の体験設計”として捉え直し、達成感が自然に積み上がって見えるUIを目指して開発。",

    ux:
      "進捗リングとカレンダーを組み合わせ、日々の達成率を視覚化。前日・翌日への軽い移動導線や、繰り返しタスクの記録設計によって、“振り返りたくなる”操作感を意識。",

    outcome:
      "タスクを並べるだけではなく、『続いていること』や『積み上がっている感覚』が自然に残る、触りたくなるToDo体験を目指しました。",

    icon: BatteryCharging,

    href: "https://github.com/Tanaka2006/ToDo",

  },
  {
    title: "Campus Board",
    subtitle: "授業選びの“不安”を、迷わず探せる体験へ。",
    accent: "pink",
    preview: "board",
    image: "/assets/generated/project-02-app-visual.png",

    tags: ["React Native", "Expo", "Supabase", "UI/UX"],

    intention:
      "履修選択で本当に欲しいのは『授業データ』だけではなく、“受けた人の体感”だと感じ、口コミを迷わず探して、気軽に投稿できる学生向けレビュー体験を目指して開発。",

    ux:
      "口コミ投稿を3ステップに分割し、入力負荷を軽減。検索導線を先に設計することで、『まず授業が見つかる』体験を重視し、学生が自然に情報交換できるUIを意識。",

    outcome:
      "完成だけではなく、試作→改善の過程も残しながら、『学生が安心して授業選択できる導線』をテーマにUI/UXを試行錯誤したプロダクトです。",

    icon: HeartHandshake,

    href: "https://github.com/Tanaka2006/keizibannzaka25",

  },
  {
    title: "jijii_news",
    subtitle: "“ニュースを開く”最初のきっかけを設計する。",
    accent: "orange",
    preview: "news",
    image: "/assets/generated/project-03-app-visual.png",

    tags: ["Next.js", "Web Push", "TypeScript", "UX Design"],

    intention:
      "『ニュースを見なきゃと思っているのに、結局見ない』という学生の行動に対して、“読む前の最初の一歩”を生み出す体験設計をテーマに開発したハッカソンプロダクト。",

    ux:
      "アカウント登録不要にすることで触り始めるハードルを下げ、通知文面を“おじさん構文”に変換することで、『少し気になって開いてしまう』導線を設計。短時間で理解できる3カードUIやAIチャットも組み込み、継続しやすいニュース接触を意識。",

    outcome:
      "機能を増やすよりも、『ユーザーが行動を起こすまで』を設計する重要性を学び、通知・再訪問・理解補助まで含めたUX設計に挑戦したプロダクトです。",

    icon: Zap,

    href: "https://github.com/Tanaka2006/jijii_news",

  },
  {
    title: "Arupaka Calendar",
    subtitle: "迷わず触れて、自然に予定を整理できるカレンダー体験。",
    accent: "green",
    preview: "lab",
    image: "/assets/generated/project-04-app-visual.png",

    tags: ["Next.js", "TypeScript", "Tailwind", "Mobile UX"],

    intention:
      "大学生の予定管理は情報が混線しやすいと感じ、『パッと見て状況を把握できて、迷わず次へ進める』モバイル向けカレンダー体験を目指して設計・実装。",

    ux:
      "片手操作を前提に情報密度を調整し、日付タップ→日別表示への自然な導線を設計。学年暦の表示状態や予定データを保持することで、『状態が続く安心感』も意識しました。",

    outcome:
      "高機能さよりも、『見やすさ』『操作の軽さ』『文脈が切れない体験』を重視し、学生生活に自然に馴染むカレンダーUIを探求したプロダクトです。",

    icon: Orbit,

    href: "https://github.com/Tanaka2006/Arupaka_calendar_web",

  },
];

const strengths = [
  { label: "観察", text: "日常の小さな違和感を拾い、「なんで触りにくいんだろう？」を考える。", icon: MousePointer2, accent: "blue" as Accent },
  { label: "実装", text: "思いついたらすぐ作る。React / TypeScript を使って、体験を素早く形にする。", icon: Blocks, accent: "green" as Accent },
  { label: "感情", text: "便利さだけではなく、「触っていて好き」だと思える感覚まで設計する。", icon: Sparkles, accent: "pink" as Accent },
];

const skills = [
  {
    title: "Languages",
    items: ["TypeScript / TSX", "JavaScript", "C", "C++", "Python"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    title: "Mobile / App",
    items: ["React Native", "Expo"],
  },
  {
    title: "Backend / Database",
    items: ["Supabase"],
  },
  {
    title: "Tools",
    items: ["GitHub", "Vercel", "Figma"],
  },
  {
    title: "Interest / Curiosity",
    items: ["UI/UX", "制御", "組み込み", "ハードウェア", "触れる体験設計"],
  },
];

const processSteps = [
  { title: "Problem", text: "誰の、どんな場面の、どんな小さな詰まりを減らしたいかを言葉にする。" },
  { title: "Prototype", text: "まず触れる形を作って、実際に使いながら操作や導線を調整する。" },
  { title: "Polish", text: "余白、動き、文言、状態表示を整えて、迷わず使える画面に近づける。" },
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

function SectionTitle({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: React.ReactNode;
  text?: React.ReactNode;
}) {
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



function MagneticProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  const rotateX = useTransform(springY, [-22, 22], [1.5, -1.5]);
  const rotateY = useTransform(springX, [-22, 22], [-1.5, 2.5]);
  const color = accents[project.accent];
  const Icon = project.icon;

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
        x.set((event.clientX - rect.left - rect.width / 2) / 30);
        y.set((event.clientY - rect.top - rect.height / 2) / 30);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div
        className="project-card-inner"
        style={{
          '--accent-main': color.bg,
          '--accent-soft': color.soft
        } as React.CSSProperties}
      >
        <div className="project-visual-preview">
          <div className="preview-container">
            <img className="project-app-image" src={project.image} alt={`${project.title} app visual`} />
          </div>
        </div>

        <div className="project-info">
          <p className="project-kicker">PROJECT 0{index + 1}</p>
          <div className="project-subtitle-pill">
            <Icon size={16} />
            <span>{project.subtitle}</span>
          </div>
          <h3>{project.title}</h3>

          <div className="project-details">
            <div className="ux-thinking-box">
              <span className="ux-label">UX THINKING</span>
              <p>{project.ux}</p>
            </div>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <footer className="project-footer">
            <TactileButton href={project.href} accent={project.accent} icon="open_in_new">
              View Project
            </TactileButton>
          </footer>
        </div>
      </div>
    </motion.article>
  );
}

function App() {
  return (
    <div className="site-shell">
      <div className="noise-layer" />
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="トップへ">
          <span>'_'</span>
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
              PORTFOLIO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              触りたくなる
              <br />
              体験を作る
            </motion.h1>
            <motion.p
              className="hero-lead"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
            >
              大学で電気電子工学を学びながら、
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
            title="自己紹介"
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
                <img src="/assets/generated/about-smile-icon.png" alt="Tanaka2006 profile icon" />
              </div>
              <div>
                <p className="mini-label">INTERACTION EXPLORER</p>
                <h3>田中　梨菜</h3>
                <p>
                学生生活の中で感じた「少し使いにくい」を、触れたくなるUIとして形にしています。
                私は特に、見た目や操作感の細部にこだわることが好きです。
                便利さだけではなく、「なんか好き」「触っていて気持ちいい」
                そんな感覚まで含めて、プロダクトとして設計したいと思っています。
                興味を持ったものにはすぐ飛び込み、試しながら形にしていくことも、自分らしいところです。
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
            title={
              <>
              作成したプロダクト
              </>
            }

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
            title="使用技術"
          />
          <div className="skill-console">
            {skills.map((skill, groupIndex) => (
              <motion.div
                className="skill-group"
                key={skill.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.07, duration: 0.5 }}
              >
                <h3>{skill.title}</h3>
                <div>
                  {skill.items.map((item, itemIndex) => (
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
            title="これから作りたい体験"
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
            今後は、モバイルUIだけでなく、制御やハードウェア、通知やセンサーを含めた“触れる体験”そのものに興味があります。
            実際に動かして試しながら、使いやすさや触れた時の印象まで考えられるプロダクトを作っていきたいです。
            </p>
          </motion.div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <p className="mini-label">Contact</p>
            <h2>お問い合わせ</h2>
            <p>
              少しでも興味を持っていただけたら、ぜひお気軽にご連絡ください。
            </p>
          </div>
          <div className="contact-actions">
            <TactileButton href="https://github.com/Tanaka2006" accent="purple" icon="code">
              GitHubを見る
            </TactileButton>
            <TactileButton href="rinatana1230@icloud.com" accent="orange" icon="mail">
              Contact
            </TactileButton>
          </div>
          <motion.div className="rocket-badge" whileHover={{ rotate: 8, scale: 1.06 }} whileTap={{ scale: 0.94 }}>
            <span className="material-icons" aria-hidden="true">
              rocket_launch
            </span>
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
