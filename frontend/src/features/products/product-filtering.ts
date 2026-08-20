import type { Product, ProductFilterState } from "@/types/product";

export const defaultFilters: ProductFilterState = {
  categories: [],
  colors: [],
  measures: [],
  options: [],
  sort: "newest",
  query: ""
};

export function toggleFilterValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function filterProducts(products: Product[], filters: ProductFilterState) {
  const query = normalizeSearchValue(filters.query);

  return sortProducts(
    products.filter((product) => {
      if (query && !productMatchesSearch(product, query)) {
        return false;
      }

      if (filters.categories.length && !filters.categories.includes(product.category)) {
        return false;
      }

      if (filters.colors.length && !filters.colors.some((color) => product.colors.includes(color))) {
        return false;
      }

      if (filters.measures.length && !filters.measures.some((measure) => product.measures.includes(measure))) {
        return false;
      }

      if (filters.options.length && !filters.options.some((option) => product.options.includes(option))) {
        return false;
      }

      return true;
    }),
    filters.sort
  );
}

function productMatchesSearch(product: Product, query: string) {
  const searchableValues = [
    product.name,
    product.description,
    product.category,
    ...product.colors,
    ...product.measures,
    ...product.options
  ];

  return searchableValues.some((value) => normalizeSearchValue(value).includes(query));
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function sortProducts(products: Product[], sort: ProductFilterState["sort"]) {
  return [...products].sort((left, right) => {
    if (sort === "price-asc") {
      return left.price - right.price;
    }

    if (sort === "price-desc") {
      return right.price - left.price;
    }

    if (sort === "name") {
      return left.name.localeCompare(right.name);
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

export function getFilterOptions(products: Product[]) {
  return {
    categories: unique(products.map((product) => product.category)),
    colors: unique(products.flatMap((product) => product.colors)),
    measures: unique(products.flatMap((product) => product.measures)),
    options: unique(products.flatMap((product) => product.options))
  };
}

export function getOptionCount(products: Product[], accessor: (product: Product) => string[]) {
  return products.reduce<Record<string, number>>((acc, product) => {
    accessor(product).forEach((value) => {
      acc[value] = (acc[value] ?? 0) + 1;
    });

    return acc;
  }, {});
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}
