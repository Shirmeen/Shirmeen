"use client";

import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/utils";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
  image?: string;
  icon?: ReactNode;
  link?: string;
  live?: string;
  tags?: string[];
}

export interface OrbitCardStackProps {
  items?: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  spread?: number;
  lift?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
}

const defaultItems: OrbitStackItem[] = [
  {
    name: "Mira Vale",
    role: "Creative Lead",
    description:
      "Shapes visual systems with enough restraint to feel expensive and enough edge to be remembered.",
    accent: "#f8d66d",
    initials: "MV",
    stat: "Identity",
    image: "/team/mira-vale.png",
  },
  {
    name: "Noor Kade",
    role: "Product Strategy",
    description:
      "Turns loose ideas into sharp product moves, crisp priorities, and launchable experiences.",
    accent: "#78dcca",
    initials: "NK",
    stat: "Roadmap",
    image: "/team/noor-kade.png",
  },
  {
    name: "Ari Chen",
    role: "Founder",
    description:
      "Sets the taste bar, protects the details, and keeps the whole team pointed at the same high signal.",
    accent: "#f3f1ea",
    initials: "AC",
    stat: "Vision",
    image: "/team/ari-chen.png",
  },
  {
    name: "Sana Holt",
    role: "Frontend Engineer",
    description:
      "Builds the motion, polish, and interface texture that make the product feel calm under pressure.",
    accent: "#b9a7ff",
    initials: "SH",
    stat: "Motion",
  },
  {
    name: "Ezra Moon",
    role: "Operations",
    description:
      "Keeps the machine quiet, the handoffs clean, and the team moving without pointless friction.",
    accent: "#ff9d77",
    initials: "EM",
    stat: "Systems",
  },
];

function inRange(index: number, length: number) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function initialsFor(item: OrbitStackItem) {
  if (item.initials) return item.initials;
  return item.name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Portrait({ item }: { item: OrbitStackItem }) {
  const initials = initialsFor(item);
  const shared =
    "relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-black/[0.08] bg-black/[0.045]";

  if (item.image) {
    return (
      <div className={shared}>
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
          {initials}
        </span>
      </div>
    );
  }

  if (item.icon) {
    return (
      <div
        className={cn(
          shared,
          "flex flex-col items-center justify-center p-6 text-center select-none"
        )}
        style={{
          background: `radial-gradient(circle at 50% 40%, ${
            item.accent ?? "#cffafe"
          }2e, transparent 75%), rgba(0,0,0,0.02)`,
        }}
      >
        <div
          className="p-4 rounded-2xl border border-black/10 bg-white/90 shadow-sm mb-2 transform transition-transform hover:scale-110"
          style={{ color: item.accent || "#111827" }}
        >
          {item.icon}
        </div>
        <span className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={shared}
      style={{ "--portrait-accent": item.accent ?? "#f3f1ea" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,var(--portrait-accent),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(255,255,255,0.5),transparent_28%)] opacity-45" />
      <div className="absolute inset-x-8 bottom-0 h-[72%] rounded-t-[999px] border-2 border-zinc-950 bg-[#f7f5ef]" />
      <div className="absolute left-1/2 top-[22%] size-24 -translate-x-1/2 rounded-[45%_55%_48%_52%] border-2 border-zinc-950 bg-[#f5f2eb]">
        <span className="absolute left-[27%] top-[34%] size-2 rounded-full bg-zinc-950" />
        <span className="absolute right-[27%] top-[34%] size-2 rounded-full bg-zinc-950" />
        <span className="absolute left-1/2 top-[52%] h-6 w-4 -translate-x-1/2 rounded-b-full border-b-2 border-zinc-950" />
        <span
          className="absolute -top-5 left-1/2 h-9 w-24 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-zinc-950"
          style={{ backgroundColor: item.accent ?? "#f3f1ea" }}
        />
      </div>
      <span className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
        {initials}
      </span>
    </div>
  );
}

export function OrbitCardStack({
  items = defaultItems,
  className,
  cardClassName,
  defaultActiveIndex = 2,
  spread = 150,
  lift = 40,
  onActiveChange,
}: OrbitCardStackProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const rawCards = items.length ? items : defaultItems;

  // Max 5 cards in the visible stack to maintain the pristine Componentry deck look
  const maxDisplay = 5;
  const isLargeSet = rawCards.length > maxDisplay;

  // If large set, keep display window around restingIndex
  const cards = useMemo(() => {
    if (!isLargeSet) return rawCards;
    return rawCards.slice(0, maxDisplay);
  }, [rawCards, isLargeSet]);

  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const midpoint = (cards.length - 1) / 2;

  // Responsive spread for mobile
  const [effectiveSpread, setEffectiveSpread] = useState(spread);

  useEffect(() => {
    const updateSpread = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setEffectiveSpread(Math.min(spread * 0.45, 65));
      } else if (window.innerWidth < 1024) {
        setEffectiveSpread(Math.min(spread * 0.75, 105));
      } else {
        setEffectiveSpread(spread);
      }
    };
    updateSpread();
    window.addEventListener("resize", updateSpread);
    return () => window.removeEventListener("resize", updateSpread);
  }, [spread]);

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        // Clamp closed stack so deck remains tightly structured
        const clampedStack = Math.max(-2, Math.min(2, stack));
        return {
          open: {
            x: orbit * effectiveSpread,
            y: Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10,
            rotation: orbit * 8.5,
          },
          closed: {
            x: clampedStack * 10,
            y: Math.abs(clampedStack) * 5,
            rotation: clampedStack * 2.8,
          },
        };
      }),
    [cards, midpoint, restingIndex, effectiveSpread]
  );

  const activate = (index: number) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next]!, next);
  };

  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };

  const leaveFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center overflow-visible select-none",
        className
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[480px] md:h-[500px] w-full max-w-[980px]"
        onMouseLeave={close}
        onBlur={leaveFocus}
        role="list"
        aria-label="Orbit card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index]!.open : layouts[index]!.closed;
          const active = index === activeIndex;
          const style: CSSProperties = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${open ? 0.985 : 0.97})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          const primaryLink = item.live || item.link;

          return (
            <article
              key={`${item.name}-${index}`}
              role="listitem"
              tabIndex={0}
              aria-current={active ? "true" : undefined}
              className={cn(
                "absolute left-1/2 top-1/2 w-[min(78vw,21rem)] origin-bottom cursor-pointer rounded-[1.9rem] border border-black/10 bg-[#e9e6df] p-4 text-[#141414] outline-none shadow-md",
                "transition-[transform] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 focus-visible:ring-zinc-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                cardClassName
              )}
              style={style}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll<HTMLElement>("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="relative">
                <Portrait item={item} />
                {primaryLink ? (
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-zinc-950 text-white shadow-lg shadow-black/20 hover:scale-110 hover:bg-zinc-800 transition-all z-10"
                    title={`Open ${item.name}`}
                  >
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                ) : (
                  <span className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-zinc-950 text-white shadow-lg shadow-black/20">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                )}
              </div>

              <div className="px-2 pb-2 pt-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-zinc-500 font-mono truncate">
                    {item.role}
                  </p>
                  {item.accent && (
                    <span
                      className="size-2 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: item.accent }}
                    />
                  )}
                </div>

                <h3 className="mt-2 text-[1.85rem] font-semibold leading-none tracking-[-0.04em] text-zinc-950 font-mono truncate">
                  {item.name}
                </h3>

                <p className="mt-4 max-w-[17rem] text-[0.95rem] font-medium leading-[1.42] tracking-[-0.01em] text-zinc-700 font-sans line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-5 border-t border-black/10 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center justify-between font-mono">
                  <span>{item.stat ?? "Featured"}</span>
                  {primaryLink && (
                    <span className="inline-flex items-center gap-1 text-zinc-950 hover:underline">
                      {item.live ? "DEMO" : "REPO"} <ArrowUpRight className="size-3" />
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default OrbitCardStack;
