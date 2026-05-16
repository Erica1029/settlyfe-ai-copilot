import { CheckCircle2 } from "lucide-react";

type ChecklistItemProps = {
  text: string;
};

export function ChecklistItem({ text }: ChecklistItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-[#e1e6df] bg-white px-3 py-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#18a058]" size={18} />
      <span className="text-sm leading-6 text-[#33413b]">{text}</span>
    </li>
  );
}
