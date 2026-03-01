import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ProductDetail } from "@/components/product-detail"

interface PageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: PageProps) {
  const { data: product, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", Number(params.id))
    .eq("activo", true)
    .single()

  if (error || !product) {
    notFound()
  }

  return <ProductDetail product={product} />
}