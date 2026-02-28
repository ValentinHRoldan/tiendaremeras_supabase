"use client";

import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export function ProductList() {
  return (
    <section aria-label="Products">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
