import { supabase } from "@/lib/supabase"
import { ProductList } from "@/components/product-list"
import { transformProduct } from "@/lib/transformers/product"

export default async function HomePage() {
  const { data: productos, error } = await supabase
    .from("productos")
    .select(`
      *,
      producto_variantes (
        *,
        producto_variante_imagenes (*)
      )
    `)
    .eq("activo", true)

  if (error) {
    console.error(error)
  }
  const products = (productos ?? []).map(transformProduct)
  // console.log(JSON.stringify(productos, null, 2))
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Nuestra Colección
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Remeras de algodón para el día a día.
        </p>
      </div>

      <ProductList products={products} />
    </main>
  )
}