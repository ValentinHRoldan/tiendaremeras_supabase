import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // importante usar service role en backend
);

export async function POST(req: Request) {
  const { items } = await req.json();

  const { data, error } = await supabase.rpc("crear_pedido", {
    _items: items
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ orderId: data });
}