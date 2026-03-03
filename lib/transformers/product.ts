
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

    const uniqueColorNames = [
    ...new Set<string>(
        variantes.map((v: any) => v.colores)
        ),
    ]; 
    const uniqueSizes = Array.from(
    new Set<string>(
        variantes
        .filter((v: any) => v.activo)
        .map((v: any) => v.talle)
    )
    );
    const colors: ProductColor[] =
    uniqueColorNames.map((color: string) => ({
        name: color,
        hex: colorMap[color] || "#CCCCCC",
    })) || [];
    console.log(colors);

    const reviews: Review[] = (producto.producto_resenas ?? [])
    .map((r: any) => ({
        id: r.id,
        author: r.autor,
        rating: r.puntuacion,
        date: r.fecha,
        comment: r.comentario,
    }))
    .sort(
        (a: { date: string | number | Date; }, b: { date: string | number | Date; }) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const allImages =
        variantes
        ?.flatMap((v: any) => v.producto_variante_imagenes ?? [])
        ?.sort((a: any, b: any) => a.posicion - b.posicion) ?? [];

    // Imagen principal
    const mainImage = allImages[0]?.imagen_url ?? null;

    // Galería sin repetir la principal
    const gallery = allImages
        ?.slice(1)
        ?.map((img: any) => img.imagen_url) ?? [];


    return {
    id: producto.id,
    name: producto.nombre,
    price: producto.precio_base,
    colors,
    image: mainImage, 
    gallery,
    description: producto.descripcion,
    details: "",
    features: producto.producto_caracteristicas?.map((c: any) => c.descripcion) || [],
    specs: {},
    sizes: uniqueSizes,
    reviews,
    };
}