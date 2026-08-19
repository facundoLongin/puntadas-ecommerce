import type { Product } from "@/types/product";

export const demoProducts: Product[] = [
  {
    id: "prod_001",
    slug: "acolchado-lino-natural",
    name: "Acolchado Lino Natural",
    description: "Acolchado demo de textura suave para dormitorio luminoso.",
    category: "acolchados",
    colors: ["beige", "off-white"],
    measures: ["1 plaza", "2 plazas", "queen"],
    options: ["con relleno"],
    price: 130000,
    transferPrice: 110500,
    measureVariants: [
      { measure: "1 plaza", price: 130000, transferPrice: 110500 },
      { measure: "2 plazas", price: 168000, transferPrice: 142800 },
      { measure: "queen", price: 194000, transferPrice: 164900 }
    ],
    installments: 3,
    imageUrl: "/images/products/acolchado-lino-natural.png",
    isNew: true,
    isFeatured: true,
    createdAt: "2026-08-18T00:00:00.000Z"
  },
  {
    id: "prod_002",
    slug: "almohadon-verde-oliva",
    name: "Almohadon Verde Oliva",
    description: "Almohadon demo con acento verde oliva para sumar contraste.",
    category: "almohadones",
    colors: ["verde-oliva"],
    measures: ["50 x 50 cm", "60 x 40 cm"],
    options: ["con relleno", "sin relleno"],
    price: 42000,
    transferPrice: 35700,
    measureVariants: [
      { measure: "50 x 50 cm", price: 42000, transferPrice: 35700 },
      { measure: "60 x 40 cm", price: 47000, transferPrice: 39950 }
    ],
    installments: 3,
    imageUrl: "/images/products/almohadon-verde-oliva.png",
    isNew: true,
    isFeatured: false,
    createdAt: "2026-08-17T00:00:00.000Z"
  },
  {
    id: "prod_003",
    slug: "cubre-edredon-gris-perla",
    name: "Cubre Edredon Gris Perla",
    description: "Cubre edredon demo en gris claro para una cama neutra.",
    category: "cubre-edredones",
    colors: ["gris"],
    measures: ["2 plazas", "queen", "king"],
    options: ["funda sola"],
    price: 98000,
    transferPrice: 83300,
    measureVariants: [
      { measure: "2 plazas", price: 98000, transferPrice: 83300 },
      { measure: "queen", price: 118000, transferPrice: 100300 },
      { measure: "king", price: 142000, transferPrice: 120700 }
    ],
    installments: 3,
    imageUrl: "/images/products/cubre-edredon-gris-perla.png",
    isNew: false,
    isFeatured: true,
    createdAt: "2026-08-12T00:00:00.000Z"
  },
  {
    id: "prod_004",
    slug: "respaldo-camel",
    name: "Respaldo Camel",
    description: "Respaldo demo tapizado para completar una habitacion calida.",
    category: "respaldos",
    colors: ["beige", "nuez"],
    measures: ["1.40 m", "1.60 m", "1.80 m"],
    options: ["tapizado"],
    price: 210000,
    transferPrice: 178500,
    measureVariants: [
      { measure: "1.40 m", price: 210000, transferPrice: 178500 },
      { measure: "1.60 m", price: 238000, transferPrice: 202300 },
      { measure: "1.80 m", price: 269000, transferPrice: 228650 }
    ],
    installments: 6,
    imageUrl: "/images/products/respaldo-camel.png",
    isNew: false,
    isFeatured: true,
    createdAt: "2026-08-10T00:00:00.000Z"
  },
  {
    id: "prod_005",
    slug: "cubrecama-algodon-stone",
    name: "Cubrecama Algodon Stone",
    description: "Cubrecama demo liviano para uso diario.",
    category: "cubrecamas",
    colors: ["gris", "off-white"],
    measures: ["1 plaza", "2 plazas"],
    options: ["sin relleno"],
    price: 76000,
    transferPrice: 64600,
    measureVariants: [
      { measure: "1 plaza", price: 76000, transferPrice: 64600 },
      { measure: "2 plazas", price: 94000, transferPrice: 79900 }
    ],
    installments: 3,
    imageUrl: "/images/products/cubrecama-algodon-stone.png",
    isNew: false,
    isFeatured: false,
    createdAt: "2026-08-06T00:00:00.000Z"
  },
  {
    id: "prod_006",
    slug: "pieza-de-cama-cotton",
    name: "Pieza de Cama Cotton",
    description: "Pieza demo tejida para sumar textura al pie de cama.",
    category: "piezas-de-cama",
    colors: ["beige", "verde-oliva"],
    measures: ["1.20 x 2.70 m", "1.40 x 2.70 m"],
    options: ["tejida"],
    price: 89000,
    transferPrice: 75650,
    measureVariants: [
      { measure: "1.20 x 2.70 m", price: 89000, transferPrice: 75650 },
      { measure: "1.40 x 2.70 m", price: 104000, transferPrice: 88400 }
    ],
    installments: 3,
    imageUrl: "/images/products/pieza-de-cama-cotton.png",
    isNew: true,
    isFeatured: false,
    createdAt: "2026-08-15T00:00:00.000Z"
  }
];
