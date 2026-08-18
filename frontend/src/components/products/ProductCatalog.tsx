"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import {
  defaultFilters,
  filterProducts,
  getFilterOptions,
  getOptionCount,
  toggleFilterValue
} from "@/features/products/product-filtering";
import type { Product, ProductCategory, ProductColor, ProductFilterState, ProductSort } from "@/types/product";

export function ProductCatalog({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<ProductFilterState>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => filterProducts(products, filters), [products, filters]);
  const options = useMemo(() => getFilterOptions(products), [products]);
  const counts = useMemo(
    () => ({
      categories: getOptionCount(products, (product) => [product.category]),
      colors: getOptionCount(products, (product) => product.colors),
      measures: getOptionCount(products, (product) => product.measures),
      options: getOptionCount(products, (product) => product.options)
    }),
    [products]
  );

  const filterProps = {
    filters,
    options,
    counts,
    products,
    onToggleCategory: (category: ProductCategory) =>
      setFilters((current) => ({ ...current, categories: toggleFilterValue(current.categories, category) })),
    onToggleColor: (color: ProductColor) =>
      setFilters((current) => ({ ...current, colors: toggleFilterValue(current.colors, color) })),
    onToggleMeasure: (measure: string) =>
      setFilters((current) => ({ ...current, measures: toggleFilterValue(current.measures, measure) })),
    onToggleOption: (option: string) =>
      setFilters((current) => ({ ...current, options: toggleFilterValue(current.options, option) })),
    onSortChange: (sort: ProductSort) => setFilters((current) => ({ ...current, sort })),
    onClear: () => setFilters(defaultFilters)
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <ProductFilters {...filterProps} />
      </div>

      <div className="grid gap-5">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <p className="text-sm text-[#6b6258]">{filteredProducts.length} resultados</p>
          <Button variant="ghost" className="gap-2 border border-[#d8c4a5]" onClick={() => setIsFilterOpen(true)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Cerrar filtros"
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="absolute bottom-0 right-0 top-0 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-[#2c2823]">Filtros</p>
              <button aria-label="Cerrar filtros" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ProductFilters {...filterProps} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
