import { supabase } from "@/lib/supabase"
import { ProductList } from "@/components/product-list"

export default async function HomePage() {
  const { data: productos, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)

  if (error) {
    console.error(error)
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Nuestra Colección
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Remeras de algodón premium para el día a día.
        </p>
      </div>

      <ProductList products={productos ?? []} />
    </main>
  )
}