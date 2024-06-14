import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST() {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from("posts")
      .select("*")
    return NextResponse.json({ data: posts.length })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
