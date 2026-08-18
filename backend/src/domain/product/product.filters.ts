import type { Product, ProductFilters } from "./product.types.js";

export function productMatchesFilters(product: Product, filters: ProductFilters): boolean {
  if (!product.isActive) {
    return false;
  }

  if (filters.categories?.length && !filters.categories.includes(product.category)) {
    return false;
  }

  if (filters.colors?.length && !filters.colors.some((color) => product.colors.includes(color))) {
    return false;
  }

  if (filters.measures?.length && !filters.measures.some((measure) => product.measures.includes(measure))) {
    return false;
  }

  if (filters.options?.length && !filters.options.some((option) => product.options.includes(option))) {
    return false;
  }

  return true;
}

export function sortProducts(products: Product[], sort: ProductFilters["sort"] = "newest"): Product[] {
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
