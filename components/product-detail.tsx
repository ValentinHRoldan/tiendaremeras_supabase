"use client";

import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart-provider";
import { StarRating } from "@/components/star-rating";
import { useState } from "react";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showError, setShowError] = useState(false);

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : 0;

  function handleAdd() {
    if (!selectedSize || !selectedColor) {
      setShowError(true);
      return;
    }
    setShowError(false);
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Top section: image + info */}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary lg:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-6 lg:py-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-muted-foreground">
                {avgRating.toFixed(1)} ({product.reviews.length}{" "}
                {product.reviews.length === 1 ? "opinion" : "opiniones"})
              </span>
            </div>
          </div>

          <p className="text-2xl font-semibold text-foreground">
            {"$"}{product.price.toFixed(2)}
          </p>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.details}
          </p>

          {/* Color selector */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Color{selectedColor ? `: ${selectedColor}` : ""}
            </h3>
            <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Seleccionar color">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color.name);
                    setShowError(false);
                  }}
                  aria-label={color.name}
                  aria-checked={selectedColor === color.name}
                  role="radio"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-foreground scale-110"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Talle{selectedSize ? `: ${selectedSize}` : ""}
            </h3>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Seleccionar talle">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowError(false);
                  }}
                  aria-label={`Talle ${size}`}
                  aria-checked={selectedSize === size}
                  role="radio"
                  className={`flex h-10 min-w-[2.75rem] items-center justify-center rounded-md border px-3 text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-muted-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Validation message */}
          {showError && (
            <p className="text-sm text-destructive" role="alert">
              Selecciona un talle y un color para continuar.
            </p>
          )}

          {/* Features */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              Caracteristicas
            </h3>
            <ul className="flex flex-col gap-1.5">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to cart */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:flex-none sm:px-10"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{added ? "Agregado!" : "Agregar al Carrito"}</span>
            </button>
            <button
              onClick={openCart}
              className="rounded-md border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Ver Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Specs */}
      <section className="mt-16">
        <h2 className="mb-6 text-lg font-bold tracking-tight text-foreground">
          Especificaciones
        </h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(product.specs).map(([key, value], i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? "bg-card" : "bg-secondary/50"}
                >
                  <td className="px-4 py-3 font-medium text-foreground w-1/3">
                    {key}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-16 pb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Opiniones de Clientes
          </h2>
          <span className="text-sm text-muted-foreground">
            {product.reviews.length}{" "}
            {product.reviews.length === 1 ? "opinion" : "opiniones"}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {product.reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
