"use client";

import { ProductList } from "@/components/product-list";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Nuestra Colección
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Remeras de algodón premium para el día a día.
        </p>
      </div>
      <ProductList />
    </main>
  );
}
