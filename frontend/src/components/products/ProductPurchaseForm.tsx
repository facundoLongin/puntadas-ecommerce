"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/features/auth/auth-context";
import { useCart } from "@/features/cart/cart-context";
import { useCartFeedback } from "@/features/cart/cart-feedback-context";
import { getDefaultMeasureVariant, getInstallmentValue, getMeasureVariant } from "@/features/products/product-pricing";
import { formatCurrency } from "@/lib/formatters";
import type { Product } from "@/types/product";

type ProductPurchaseFormProps = {
  product: Product;
  compact?: boolean;
};

export function ProductPurchaseForm({ product, compact = false }: ProductPurchaseFormProps) {
  const defaultVariant = getDefaultMeasureVariant(product);
  const [selectedMeasure, setSelectedMeasure] = useState(defaultVariant.measure);
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { showCartFeedback } = useCartFeedback();

  const selectedVariant = useMemo(
    () => getMeasureVariant(product, selectedMeasure),
    [product, selectedMeasure]
  );
  const installmentValue = getInstallmentValue(selectedVariant.price, product.installments);

  function handleAddToCart() {
    if (!isAuthenticated) {
      showCartFeedback({
        title: "Necesitás una cuenta",
        description: "Para agregar productos al carrito, ingresá o creá tu cuenta de cliente.",
        actionLabel: "Ingresar o registrarme",
        href: "/ingresar",
        tone: "auth"
      });
      return;
    }

    addItem({
      product,
      measure: selectedVariant.measure,
      unitPrice: selectedVariant.price,
      transferUnitPrice: selectedVariant.transferPrice
    });
    showCartFeedback({
      title: "Producto agregado al carrito",
      description: `${product.name} - ${selectedVariant.measure}`,
      actionLabel: "Ver carrito",
      href: "/carrito",
      tone: "success"
    });
  }

  return (
    <div className={compact ? "grid gap-2" : "grid max-w-md gap-4"}>
      <Select
        label="Medida"
        value={selectedMeasure}
        onChange={(event) => setSelectedMeasure(event.target.value)}
        options={product.measureVariants.map((variant) => ({
          label: `${variant.measure} - ${formatCurrency(variant.price)}`,
          value: variant.measure
        }))}
      />

      <div className="grid gap-1 text-sm">
        <p className={compact ? "font-bold text-[#171411]" : "text-2xl font-bold text-[#211d19]"}>
          {formatCurrency(selectedVariant.price)}
        </p>
        <p className="text-xs font-semibold leading-5 text-[#4a443d]">
          {formatCurrency(selectedVariant.transferPrice)} con transferencia
        </p>
        <p className="text-xs text-[#6f675d]">
          {product.installments} x {formatCurrency(installmentValue)} sin interes
        </p>
      </div>

      <Button className="w-full" onClick={handleAddToCart}>
        Agregar al carrito
      </Button>
    </div>
  );
}
