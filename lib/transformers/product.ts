
// lib/transformers/product.ts
import { Product, ProductColor, Review } from "./../../data/products"; 

const colorMap: Record<string, string> = {
  Negro: "#000000",
  Blanco: "#FFFFFF",
  Rojo: "#FF0000",
  Azul: "#0000FF",
};

export function transformProduct(producto: any): Product {
  const variantes = producto.producto_variantes ?? [];

  // 1. Construimos las variants reales
  const variants = variantes.map((v: any) => ({
    id: v.id,
    color: v.colores,
    size: v.talle,
    stock: v.stock,
    price: v.precio,
    activo: v.activo,
    images:
      v.producto_variante_imagenes
        ?.sort((a: any, b: any) => a.posicion - b.posicion)
        ?.map((img: any) => img.imagen_url) ?? [],
    es_principal: v.es_principal
  }));

  // 2. Derivamos sizes únicos desde variants
  const sizes: string[] = Array.from(
    new Set(
      variants
        .filter((v: any) => v.activo)
        .map((v: any) => v.size)
    )
  );

  // 3. Derivamos colors únicos desde variants
  const uniqueColorNames = Array.from(
    new Set<string>(
      variants
        .filter((v: any) => v.activo)
        .map((v: any) => v.color)
    )
  );

  const colors: ProductColor[] = uniqueColorNames.map((color) => ({
    name: color,
    hex: colorMap[color] || "#CCCCCC",
  }));

  // 4. Reviews
  const reviews: Review[] = (producto.producto_resenas ?? [])
    .map((r: any) => ({
      id: r.id,
      author: r.autor,
      rating: r.puntuacion,
      date: r.fecha,
      comment: r.comentario,
    }))
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return {
    id: producto.id,
    name: producto.nombre,
    price: producto.precio_base,
    description: producto.descripcion,
    details: "",
    features:
      producto.producto_caracteristicas?.map((c: any) => c.descripcion) || [],
    specs: {},
    reviews,
    variants,
    sizes,
    colors,
  };
}