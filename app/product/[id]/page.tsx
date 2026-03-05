// import { notFound } from "next/navigation"
// import { supabase } from "@/lib/supabase"
// import { ProductDetail } from "@/components/product-detail"

// interface PageProps {
//   params: { id: string }
// }

// export default async function ProductPage({ params }: PageProps) {
//   const { data: product, error } = await supabase
//     .from("productos")
//     .select("*")
//     .eq("id", Number(params.id))
//     .eq("activo", true)
//     .single()

//   if (error || !product) {
//     notFound()
//   }

//   return <ProductDetail product={product} />
// }

import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ProductDetail } from "@/components/product-detail"
import { transformProduct } from "@/lib/transformers/product"

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { color?: string }
}) {
  const { id } = await params

  // const { data: product, error } = await supabase
  //   .from("productos")
  //   .select("*")
  //   .eq("id", Number(id))
  //   .eq("activo", true)
  //   .single()

  const { data: product, error } = await supabase
    .from("productos")
    .select(`
      *,
      producto_variantes (
        *,
        producto_variante_imagenes (*)
      ),
      producto_caracteristicas (*)
      // producto_resenas (*)
    `)
    .eq("activo", true)
    .eq("id", Number(id))
    // .order("fecha", { ascending: false, foreignTable: "producto_resenas" })
    .single()   
  if (error || !product) {
    notFound()
  }

  // return <ProductDetail product={transformProduct(product)} />
  return (
  <ProductDetail
    product={transformProduct(product)}
    initialColor={searchParams?.color}
  />
)
}


