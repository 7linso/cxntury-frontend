import { type OptionProps } from "../lib/types";

export default function Option({
  text,
  selected,
  disabled,
  onSelect,
}: OptionProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={[
        "w-full text-left flex items-center gap-3 rounded-xl border px-4 py-3 transition",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-green-500/5",
        selected
          ? "border-[#50c878] bg-[#50c878]/10"
          : "border-green-500/30 hover:border-green-500",
      ].join(" ")}
    >
      <span
        className={[
          "h-6 w-6 rounded-full border flex items-center justify-center ",
          selected ? "border-[#50c878]" : "border-green-500/30",
        ].join(" ")}
      >
        {selected ? <span className="text-green-500 text-sm">✓</span> : null}
      </span>

      <span className="text-green-500">{text}</span>
    </button>
  );
}
