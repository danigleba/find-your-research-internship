import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const institutions = ["Harvard", "MIT", "Stanford", "Yale", "Oxford", "Cambridge", "Brown"]
  try {
    const { data: posts, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("special", true)
    return NextResponse.json({ data: posts })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
