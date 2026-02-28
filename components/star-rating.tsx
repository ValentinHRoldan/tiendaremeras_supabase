"use client";

import { Star } from "lucide-react";

export function StarRating({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "fill-accent text-accent"
              : "fill-none text-border"
          }
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}
