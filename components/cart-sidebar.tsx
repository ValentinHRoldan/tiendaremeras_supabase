"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold tracking-wide text-foreground uppercase">
            Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
              <ShoppingBag className="h-12 w-12" />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity, size, color }) => {
                const key = `${product.id}-${size}-${color}`;
                return (
                <li
                  key={key}
                  className="flex gap-4 rounded-lg border border-border p-3"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-medium text-foreground">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(key)}
                        aria-label={`Quitar ${product.name} del carrito`}
                        className="rounded p-0.5 text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {size} / {color}
                    </p>

                    <p className="text-sm font-semibold text-foreground">
                      {"$"}{(product.price * quantity).toFixed(2)}
                    </p>

                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(key)}
                        aria-label={`Disminuir cantidad de ${product.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm font-medium text-foreground">
                        {quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(key)}
                        aria-label={`Aumentar cantidad de ${product.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center justify-between pb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Subtotal
              </span>
              <span className="text-lg font-semibold text-foreground">
                {"$"}{totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Finalizar Compra
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
