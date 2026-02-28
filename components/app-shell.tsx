"use client";

import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartProvider, useCart } from "@/components/cart-provider";
import { CartSidebar } from "@/components/cart-sidebar";

function Header() {
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const isDetail = pathname.startsWith("/product/");

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {isDetail && (
            <Link
              href="/"
              className="flex items-center gap-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
              aria-label="Volver a la tienda"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <Link href="/">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              REMERAS
            </h1>
          </Link>
        </div>
        <button
          onClick={openCart}
          aria-label="Abrir carrito de compras"
          className="relative rounded-md p-2 text-foreground transition-colors hover:bg-secondary"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
      <CartSidebar />
    </CartProvider>
  );
}
