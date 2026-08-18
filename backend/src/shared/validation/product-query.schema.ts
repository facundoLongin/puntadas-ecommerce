import { z } from "zod";

const toArray = (value: unknown) => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value.split(",").filter(Boolean);
  }

  return value;
};

const categorySchema = z.enum([
  "acolchados",
  "almohadones",
  "cubrecamas",
  "cubre-edredones",
  "piezas-de-cama",
  "respaldos"
]);

const colorSchema = z.enum(["beige", "gris", "nuez", "off-white", "verde-oliva"]);

export const productQuerySchema = z.object({
  categories: z.preprocess(toArray, z.array(categorySchema).optional()),
  colors: z.preprocess(toArray, z.array(colorSchema).optional()),
  measures: z.preprocess(toArray, z.array(z.string()).optional()),
  options: z.preprocess(toArray, z.array(z.string()).optional()),
  sort: z.enum(["newest", "price-asc", "price-desc", "name"]).optional()
});
