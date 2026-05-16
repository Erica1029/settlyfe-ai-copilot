import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import {
  AlertTriangle,
  Check,
  ChevronRight,
} from "lucide-react";
import type { ChecklistSection, ScoredRentalArea } from "@/types/rental";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
};

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#262628] md:grid md:place-items-center md:py-8">
      <div className="mx-auto h-[812px] w-full max-w-[375px] overflow-hidden bg-white shadow-none md:w-[375px] md:shadow-[0_28px_80px_rgba(0,0,0,0.16)]">
        {children}
      </div>
    </main>
  );
}

export function StatusBar() {
  return (
    <div className="flex h-[44px] items-center justify-between px-6 pt-2 text-[14px] font-semibold text-black">
      <span>9:41</span>
      <div className="flex items-center gap-[7px] text-black" aria-hidden="true">
        <span className="flex h-[11px] items-end gap-[2px]">
          <span className="h-[4px] w-[3px] rounded-sm bg-black" />
          <span className="h-[7px] w-[3px] rounded-sm bg-black" />
          <span className="h-[10px] w-[3px] rounded-sm bg-black" />
        </span>
        <span className="relative h-[11px] w-[15px]">
          <span className="absolute left-0 top-[1px] h-[11px] w-[15px] rounded-t-full border-[1.5px] border-b-0 border-black" />
          <span className="absolute left-[4px] top-[5px] h-[7px] w-[7px] rounded-t-full border-[1.5px] border-b-0 border-black" />
          <span className="absolute left-[6px] top-[9px] size-[3px] rounded-full bg-black" />
        </span>
        <span className="relative h-[11px] w-[22px] rounded-[3px] border-[1.5px] border-black p-[1.5px]">
          <span className="absolute -right-[3px] top-[3px] h-[5px] w-[2px] rounded-r bg-black" />
          <span className="block h-full w-full rounded-[1.5px] bg-black" />
        </span>
      </div>
    </div>
  );
}

export function FlowTopBar({
  title,
  onBack,
}: {
  title?: string;
  onBack: () => void;
}) {
  return (
    <header className="border-b border-[#f1f1f3] bg-white px-4 pb-4">
      <StatusBar />
      <div className="relative flex h-9 items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-[13px] leading-none text-[#3f3f43] underline decoration-[#c5c5ca] underline-offset-2"
        >
          Go back
        </button>
        {title ? (
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-extrabold">
            {title}
          </h1>
        ) : null}
      </div>
    </header>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-[#6463F0] text-white shadow-[0_10px_22px_rgba(100,99,240,0.2)]",
    secondary: "border border-[#d7d7db] bg-white text-[#262628]",
    text: "text-[#6463F0] underline underline-offset-2",
  };

  return (
    <button
      className={`inline-flex min-h-[50px] items-center justify-center rounded-[8px] px-5 text-[17px] font-medium leading-[20px] transition active:scale-[0.99] disabled:bg-[#dcdce2] disabled:text-white ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-20 shrink-0 bg-white/96 px-4 pb-7 pt-3 backdrop-blur">
      {children}
    </div>
  );
}

export function TextField({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block h-[52px] rounded-[8px] border border-[#d9d9dc] bg-white px-4 py-[5px] ${className}`}>
      <span className="block text-[11px] font-normal leading-[18px] text-[#717171]">{label}</span>
      <input
        className="mt-0.5 w-full bg-transparent text-[16px] leading-[23px] text-[#262628] outline-none placeholder:text-[#a5a5aa]"
        {...props}
      />
    </label>
  );
}

export function StepHeader({
  step,
  title,
  body,
  onBack,
}: {
  step: string;
  title: string;
  body: string;
  onBack: () => void;
}) {
  return (
    <header className="px-4">
      <StatusBar />
      <div className="mt-5 flex items-center justify-between">
        <p className="text-[13px] uppercase tracking-[0.02em]">{step}</p>
        <button
          type="button"
          onClick={onBack}
          className="text-[13px] text-[#3f3f43] underline decoration-[#c5c5ca] underline-offset-2"
        >
          Go back
        </button>
      </div>
      <h1 className="mt-8 text-[20px] font-normal leading-[26px] tracking-0">{title}</h1>
      <p className="mt-2 text-[14px] leading-[21px] text-[#7a7a7d]">{body}</p>
    </header>
  );
}

export function RadioOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-3 py-[7px] text-left text-[15px] leading-[20px]"
    >
      <span
        className={`grid size-[18px] place-items-center rounded-full border ${
          selected ? "border-[#262628] bg-[#262628]" : "border-[#d9d9dc] bg-white"
        }`}
      >
        {selected ? <span className="size-1.5 rounded-full bg-white" /> : null}
      </span>
      <span>{label}</span>
    </button>
  );
}

export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-[6px] text-[14px] leading-[18px] ${
        selected
          ? "border-[#6463F0] bg-[#f1f0ff] text-[#6463F0]"
          : "border-[#d9d9dc] bg-white text-[#555558]"
      }`}
    >
      {label}
    </button>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[14px] font-normal leading-[21px] text-[#222222]">{children}</h2>;
}

export function BottomNav() {
  const tabs = [
    { label: "Home", iconSrc: "/icons/tab-home.svg", active: true },
    { label: "Find Homes", iconSrc: "/icons/tab-find-homes.svg" },
    { label: "Messages", iconSrc: "/icons/tab-messages.svg" },
    { label: "Account", iconSrc: "/icons/tab-account.svg" },
  ];

  return (
    <nav className="z-30 grid shrink-0 grid-cols-4 border-t border-[#eeeeef] bg-white px-2 pb-3 pt-2">
      {tabs.map(({ label, iconSrc, active }) => (
        <div
          key={label}
          className={`grid justify-items-center gap-1 text-[14px] leading-none ${
            active ? "text-[#6463F0]" : "text-[#9b9b9f]"
          }`}
        >
          <img src={iconSrc} alt="" className="size-6 object-contain" />
          <span>{label}</span>
        </div>
      ))}
    </nav>
  );
}

export function HomeFeatureGrid() {
  const groups = [
    {
      title: "Find a new home",
      items: [
        { label: "Find Homes", imageSrc: "/icons/icon-find-homes.svg" },
        { label: "Agents", imageSrc: "/icons/icon-agents.svg" },
        { label: "Roommate", imageSrc: "/icons/icon-roommate.svg" },
        { label: "Applications", imageSrc: "/icons/icon-applications.svg" },
      ],
    },
    {
      title: "Manage my home",
      items: [
        { label: "My Home", imageSrc: "/icons/icon-my-home.svg" },
        { label: "Furnitures", imageSrc: "/icons/icon-furnitures.svg" },
        { label: "Services", imageSrc: "/icons/icon-services.svg" },
        { label: "Calendar", imageSrc: "/icons/icon-calendar.svg" },
      ],
    },
  ];

  return (
    <div className="grid gap-5 px-4">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="mb-5 text-[17px] font-normal">{group.title}</h2>
          <div className="grid grid-cols-4 gap-3">
            {group.items.map(({ label, imageSrc }) => (
              <div key={label} className="grid justify-items-center gap-2 text-center">
                <div className="grid size-10 place-items-center rounded-full bg-[#efefff] text-[#6463F0]">
                  <img
                    src={imageSrc}
                    alt=""
                    className="size-6 object-contain"
                  />
                </div>
                <p className="whitespace-nowrap text-[14px] leading-[18px]">{label}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function HomeHeader() {
  return (
    <header className="px-4">
      <StatusBar />
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-[38px] overflow-hidden rounded-full bg-[#efefff]">
            <img
              src="/images/avatar-eric.jpg"
              alt="Eric Liu"
              className="size-full object-cover"
            />
          </div>
          <div>
            <p className="text-[16px] leading-[18px] text-[#b1b1b4]">Welcome</p>
            <p className="text-[15px] font-bold leading-[18px] text-black">Eric Liu</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="grid size-8 place-items-center rounded-full bg-[#f7f7f8]"
        >
          <img src="/icons/icon-notification.svg" alt="" className="size-5 object-contain" />
        </button>
      </div>
    </header>
  );
}

export function ListingPreviewSections() {
  const listings = [
    {
      imageSrc: "/images/home-listing-1.jpg",
      meta: "4 beds · 3 bath",
      address: "4365 Motain Ave NE, San Diego",
    },
    {
      imageSrc: "/images/home-listing-2.jpg",
      meta: "4 beds · 3 bath",
      address: "4365 Motain Ave NE, San Diego",
    },
  ];
  const agents = [
    {
      imageSrc: "/images/agent-jasmine.jpg",
      name: "Jasmine Taylor",
    },
    {
      imageSrc: "/images/agent-jordan.jpg",
      name: "Jordan Smith",
    },
  ];

  return (
    <div className="grid gap-8 px-4 pb-8">
      <section>
        <h2 className="mb-4 text-[22px] font-extrabold leading-[26px]">Best Homes Near Me</h2>
        <div className="flex gap-3 overflow-hidden">
          {listings.map((listing) => (
            <div key={listing.imageSrc} className="min-w-[158px]">
              <div className="h-[98px] overflow-hidden rounded-t-[8px] bg-[#f5f5f7]">
                <img
                  src={listing.imageSrc}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="pt-2 text-[11px] text-[#747477]">
                <p>{listing.meta}</p>
                <p className="mt-1 leading-[15px]">{listing.address}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-[22px] font-extrabold leading-[26px]">Best Rated Agents</h2>
        <div className="grid grid-cols-2 gap-3">
          {agents.map((agent) => (
            <div key={agent.name}>
              <div className="h-[118px] overflow-hidden rounded-[8px] bg-[#f5f5f7]">
                <img
                  src={agent.imageSrc}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <p className="mt-2 text-[15px]">{agent.name}</p>
              <p className="text-[12px] text-[#777]">★ 4.9</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function MatchCard({
  match,
  large = false,
  imageSrc,
}: {
  match: ScoredRentalArea;
  large?: boolean;
  imageSrc?: string;
}) {
  return (
    <article className={`overflow-hidden rounded-[16px] bg-white shadow-[0_14px_34px_rgba(0,0,0,0.08)] ${large ? "" : "flex h-[260px] flex-col"}`}>
      <div className={`relative shrink-0 ${large ? "h-40" : "h-28"} overflow-hidden bg-gradient-to-br ${match.visualTone}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="size-full object-cover"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent" />
        <span
          className={`absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-white font-medium text-[#6463F0] ${
            large ? "h-7 px-2.5 text-[12px] leading-none" : "h-6 px-2.5 text-[12px] leading-none"
          }`}
        >
          {match.fitScore}% fit
        </span>
        {!large ? (
          <span className="absolute left-3 top-3 inline-flex h-6 items-center justify-center rounded-full bg-white px-2.5 text-[12px] leading-none text-[#6463F0]">
            {match.role}
          </span>
        ) : null}
      </div>
      <div className={large ? "p-4" : "flex flex-1 flex-col p-3"}>
        <p className={large ? "text-[25px] leading-[30px]" : "text-[20px] leading-[24px]"}>
          ${match.price}/mo
        </p>
        <p className="mt-2 text-[15px] text-[#4e4e52]">{match.area}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] leading-[16px] text-[#616165]">
          <span>{match.roomType} · {match.bathroom}</span>
          <span>{match.commuteMinutes} min</span>
        </div>
        {!large ? (
          <div className="mt-auto pt-3 text-[12px] leading-[18px]">
            <p className="text-[#16a063]">+ {match.strengths[0]}</p>
            <p className="text-[#f08a00]">! {match.tradeoffs[0]}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function InsightList({
  items,
  tone = "success",
}: {
  items: string[];
  tone?: "success" | "warning" | "action";
}) {
  const colors = {
    success: "text-[#14a365]",
    warning: "text-[#f08a00]",
    action: "text-[#6463F0]",
  };

  return (
    <div className="rounded-[8px] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
      <ul className="grid gap-6">
        {items.map((item, index) => (
          <li key={item} className="flex items-start gap-5 text-[15px] leading-[23px]">
            <span className={`mt-1 shrink-0 ${colors[tone]}`}>
              {tone === "action" ? (
                <ChevronRight size={18} />
              ) : tone === "warning" ? (
                <AlertTriangle size={17} strokeWidth={2.2} />
              ) : (
                <Check size={17} strokeWidth={2.2} />
              )}
            </span>
            <span>{item}</span>
            {tone === "action" ? (
              <span className="ml-auto grid size-6 shrink-0 place-items-center rounded-full border border-[#6463F0] text-[#6463F0]">
                <ChevronRight size={16} />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChecklistCard({
  section,
  completed,
  onToggle,
}: {
  section: ChecklistSection;
  completed: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const Icon = section.icon;

  return (
    <section className="rounded-[12px] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-4">
        <Icon size={22} />
        <h2 className="text-[18px] leading-[24px]">{section.title}</h2>
      </div>
      <div className="my-4 h-px bg-[#eeeeef]" />
      <div className="grid gap-4">
        {section.items.map((item) => {
          const checked = Boolean(completed[item.id]);
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onToggle(item.id)}
              className="flex items-start gap-3 text-left"
            >
              <span
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-[5px] border ${
                  checked
                    ? "border-[#6463F0] bg-[#6463F0] text-white"
                    : "border-[#cfcfd2] bg-white text-transparent"
                }`}
              >
                <Check size={17} />
              </span>
              <span
                className={`text-[15px] leading-[22px] ${
                  checked ? "text-[#9b9b9f] line-through" : "text-[#262628]"
                }`}
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SofaIcon(props: { size?: number; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth ?? 2} width={props.size ?? 24} height={props.size ?? 24}>
      <path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
      <path d="M4 12h16a2 2 0 0 1 2 2v5H2v-5a2 2 0 0 1 2-2Z" />
      <path d="M6 19v2M18 19v2" />
    </svg>
  );
}

function CalendarIcon(props: { size?: number; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth ?? 2} width={props.size ?? 24} height={props.size ?? 24}>
      <path d="M7 3v4M17 3v4M4 8h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 13h3M13 13h3M8 17h3M13 17h3" />
    </svg>
  );
}
