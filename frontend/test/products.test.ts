import assert from "node:assert/strict";
import { test } from "node:test";
import { demoProducts } from "../src/features/products/demo-products";
import { defaultFilters, filterProducts, getFilterOptions, toggleFilterValue } from "../src/features/products/product-filtering";
import { getDefaultMeasureVariant, getInstallmentValue, getMeasureVariant } from "../src/features/products/product-pricing";

test("product filtering combines category, color, measure, and sorting", () => {
  const filtered = filterProducts(demoProducts, {
    ...defaultFilters,
    categories: ["acolchados"],
    colors: ["beige"],
    measures: ["queen"],
    sort: "price-desc"
  });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].slug, "acolchado-lino-natural");
});

test("filter options and toggles are reusable", () => {
  const options = getFilterOptions(demoProducts);

  assert.ok(options.categories.includes("almohadones"));
  assert.deepEqual(toggleFilterValue(["beige"], "beige"), []);
  assert.deepEqual(toggleFilterValue(["beige"], "gris"), ["beige", "gris"]);
});

test("product filtering supports text search", () => {
  const filtered = filterProducts(demoProducts, {
    ...defaultFilters,
    query: "verde oliva"
  });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].slug, "almohadon-verde-oliva");
});

test("measure pricing selects variants and falls back safely", () => {
  const product = demoProducts.find((item) => item.slug === "acolchado-lino-natural");
  assert.ok(product);

  const queen = getMeasureVariant(product, "queen");
  const fallback = getMeasureVariant(product, "medida inexistente");

  assert.equal(queen.price, 194000);
  assert.deepEqual(fallback, getDefaultMeasureVariant(product));
  assert.equal(getInstallmentValue(queen.price, 3), queen.price / 3);
});
