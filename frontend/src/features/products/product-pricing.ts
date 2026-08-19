import type { Product, ProductMeasureVariant } from "@/types/product";

export function getDefaultMeasureVariant(product: Product): ProductMeasureVariant {
  return product.measureVariants[0] ?? {
    measure: product.measures[0] ?? "Unica",
    price: product.price,
    transferPrice: product.transferPrice
  };
}

export function getMeasureVariant(product: Product, measure: string): ProductMeasureVariant {
  return product.measureVariants.find((variant) => variant.measure === measure) ?? getDefaultMeasureVariant(product);
}

export function getInstallmentValue(price: number, installments: number) {
  return price / installments;
}
