import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {
  const { page, section } = await req.json()
  const pageNumber = parseInt(page)
  try {
    const { data: posts, error } = await supabase
      .from("projects")
      .select("*")
    return NextResponse.json({ data: posts })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
