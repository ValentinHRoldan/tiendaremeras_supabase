import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-medium tracking-wide text-foreground uppercase">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold text-foreground">
            {"$"}{product.price.toFixed(2)}
          </span>
          <div className="flex gap-1.5">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="h-4 w-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
