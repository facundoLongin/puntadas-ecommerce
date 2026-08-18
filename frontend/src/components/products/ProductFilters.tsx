import type { ReactNode } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { categoryLabels, colorLabels, sortLabels } from "@/features/products/product-options";
import type { Product, ProductCategory, ProductColor, ProductFilterState, ProductSort } from "@/types/product";

type ProductFiltersProps = {
  filters: ProductFilterState;
  options: {
    categories: ProductCategory[];
    colors: ProductColor[];
    measures: string[];
    options: string[];
  };
  counts: {
    categories: Record<string, number>;
    colors: Record<string, number>;
    measures: Record<string, number>;
    options: Record<string, number>;
  };
  onToggleCategory: (category: ProductCategory) => void;
  onToggleColor: (color: ProductColor) => void;
  onToggleMeasure: (measure: string) => void;
  onToggleOption: (option: string) => void;
  onSortChange: (sort: ProductSort) => void;
  onClear: () => void;
  products: Product[];
};

export function ProductFilters({
  filters,
  options,
  counts,
  onToggleCategory,
  onToggleColor,
  onToggleMeasure,
  onToggleOption,
  onSortChange,
  onClear,
  products
}: ProductFiltersProps) {
  const hasFilters =
    filters.categories.length || filters.colors.length || filters.measures.length || filters.options.length;

  return (
    <aside className="grid gap-7 text-[#2c2823]">
      <Select
        label="Ordenar por"
        value={filters.sort}
        onChange={(event) => onSortChange(event.target.value as ProductSort)}
        options={Object.entries(sortLabels).map(([value, label]) => ({ value, label }))}
      />

      <FilterSection title="Categorias">
        {options.categories.map((category) => (
          <Checkbox
            key={category}
            label={categoryLabels[category]}
            count={counts.categories[category]}
            checked={filters.categories.includes(category)}
            onChange={() => onToggleCategory(category)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Color">
        {options.colors.map((color) => (
          <Checkbox
            key={color}
            label={colorLabels[color]}
            count={counts.colors[color]}
            checked={filters.colors.includes(color)}
            onChange={() => onToggleColor(color)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Medida">
        {options.measures.map((measure) => (
          <Checkbox
            key={measure}
            label={measure}
            count={counts.measures[measure]}
            checked={filters.measures.includes(measure)}
            onChange={() => onToggleMeasure(measure)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Opcion">
        {options.options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            count={counts.options[option]}
            checked={filters.options.includes(option)}
            onChange={() => onToggleOption(option)}
          />
        ))}
      </FilterSection>

      {hasFilters ? (
        <button className="text-left text-sm font-semibold text-[#6f7c4e] underline" onClick={onClear}>
          Limpiar filtros
        </button>
      ) : null}

      <p className="text-xs text-[#81776c]">{products.length} productos demo disponibles.</p>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-base font-medium text-[#2c2823]">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </section>
  );
}
