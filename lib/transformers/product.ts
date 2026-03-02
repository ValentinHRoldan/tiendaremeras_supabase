
// lib/transformers/product.ts
import { Product, ProductColor } from "./../../data/products"; // o donde esté tu interfaz

const colorMap: Record<string, string> = {
  Negro: "#000000",
  Blanco: "#FFFFFF",
  Rojo: "#FF0000",
  Azul: "#0000FF",
};

export function transformProduct(producto: any): Product {
    const variantes = producto.producto_variantes ?? [];
    const uniqueColorNames = [
    ...new Set<string>(
        variantes.map((v: any) => v.colores)
    ),
    ]; 

    const colors: ProductColor[] =
    uniqueColorNames.map((color: string) => ({
        name: color,
        hex: colorMap[color] || "#CCCCCC",
    })) || [];
    console.log(colors);
    return {
    id: producto.id,
    name: producto.nombre,
    price: producto.precio_base,
    colors,
    image: variantes
        ?.flatMap((v: any) => v.producto_variante_imagenes ?? [])
        ?.sort((a: any, b: any) => a.posicion - b.posicion)[0]
        ?.imagen_url ?? null, 
    description: producto.descripcion,
    details: "",
    features: [],
    specs: {},
    sizes: [],
    reviews: [],
    };
}