import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Array<{ label: string; value: string }>;
};

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <label className="grid gap-2 text-sm text-[#34302b]">
      <span className="font-medium">{label}</span>
      <select
        className="h-10 rounded-md border border-[#d9cbb5] bg-white px-3 text-sm outline-none transition focus:border-[#6f7c4e]"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
