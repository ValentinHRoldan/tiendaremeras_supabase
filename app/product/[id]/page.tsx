"use client";

import { useParams, notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetail } from "@/components/product-detail";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
