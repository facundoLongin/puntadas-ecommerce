import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  count?: number;
};

export function Checkbox({ label, count, ...props }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-[#34302b]">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-[#cdbb9f] text-[#6f7c4e] accent-[#6f7c4e]"
        {...props}
      />
      <span className="flex-1">
        {label}
        {typeof count === "number" ? <span className="text-[#7b746b]"> ({count})</span> : null}
      </span>
    </label>
  );
}
