"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useState } from "react";

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
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Cart items:", items);

  const colorMapEmoji: Record<string, string> = {
    // Unicode literals correctos
    "Negro": "\u26AB",          // ⚫
    "Rojo": "\uD83D\uDD34",     // 🔴
    "Azul": "\uD83D\uDD35",     // 🔵
    "Blanco": "\u26AA",         // ⚪
    "Verde": "\uD83D\uDFE2",    // 🟢
    "Amarillo": "\uD83D\uDFE1"  // 🟡
  };
  const handleCheckout = async () => {
    if (isLoading) return;
    setErrorMessage("");
    try {
      setIsLoading(true);
      const formattedItems = items.map(({ product, quantity, size, color }) => {
        const variant = product.variants.find(
          (v) => v.color === color && v.size === size
        );

        return {
          variante_id: variant?.id,
          cantidad: quantity,
          nombre: product.name,
          size,
          color,
        };
      });

      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: formattedItems.map(({ variante_id, cantidad }) => ({
            variante_id,
            cantidad,
          })),
        }),
      });

      const data = await response.json();
      console.log("Pedido response:", data);
      if (!response.ok) {
        setErrorMessage(data.error || "Error al crear pedido");
        return;
      }

      const orderId = data.orderId;

      // 🧾 Construcción del mensaje detallado
      const itemsText = formattedItems
        .map(
          (item) => 
            `• *${item.nombre}*\n` + // Negrita en WhatsApp
            `  Talle: *${item.size}\n*` +
            `  Color: *${item.color} ${colorMapEmoji[item.color] || ""}\n*` +
            `  Cantidad: *${item.cantidad}*`
        )
        .join("\n\n"); // Doble salto entre productos para mayor claridad

      const message = `¡Hola! Quiero confirmar el pedido *#${orderId}*\n\n` +
                      `${itemsText}\n\n` +
                      `*Total: $${totalPrice.toFixed(2)}*`;

      const encodedMessage = encodeURIComponent(message);
      const phone = "5493834568407";

      //usando api wsp
      const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
      window.open(url, '_blank');

      // const url = `https://wa.me/${phone}?text=${encodedMessage}`;
      // window.open(url, '_blank', 'noreferrer');

    } catch (error) {
      console.error(error);
      alert("Error inesperado");
      setIsLoading(false);
    } finally {
    // 🔥 se reactiva después de 10 segundos
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage("");
    }, 5000);
  }
};
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
            Carrito ({totalItems})
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
                const variant = product.variants.find(
                  v => v.color === color && v.size === size
                );
                const key = `${product.id}-${size}-${color}`;
                const variantWithImage =
                  product.variants.find(
                    v => v.color === color && v.images && v.images.length > 0
                  ) ??
                  product.variants.find(
                    v => v.images && v.images.length > 0
                  );

              const imageUrl = variantWithImage?.images?.[0] ?? "/placeholder.png";
                return (
                <li
                  key={key}
                  className="flex gap-4 rounded-lg border border-border p-3"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                    <Image
                      src={imageUrl}
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
                    {variant && variant.stock > 0 && (
                      variant.stock === 1 ? (
                        <p className="text-xs font-semibold text-destructive mt-1">
                          ÚLTIMA DISPONIBLE
                        </p>
                      ) : variant.stock < 5 ? (
                        <p className="text-xs font-semibold text-destructive mt-1">
                          ÚLTIMAS {variant.stock} DISPONIBLES
                        </p>
                      ) : null // Si tiene 5 o más, no muestra nada
                    )}
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
          <p className="text-xl font-semibold text-destructive mt-1">
            {errorMessage}
          </p>
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
            <button 
              onClick={handleCheckout}
              disabled={isLoading}
              className={`w-full rounded-md py-3 text-sm font-medium transition-opacity
                ${isLoading 
                  ? "bg-primary/50 cursor-not-allowed text-primary-foreground" 
                  : "bg-primary hover:opacity-90 text-primary-foreground"
                }`}
            >
              {isLoading ? "Procesando..." : "Finalizar Compra"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

