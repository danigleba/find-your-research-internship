import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
  const { page, section } = await req.json()
  const pageNumber = parseInt(page)
  try {
    const { data: posts, error } = await supabaseAdmin
      .from("projects")
      .select("*")
    return NextResponse.json({ data: posts })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
