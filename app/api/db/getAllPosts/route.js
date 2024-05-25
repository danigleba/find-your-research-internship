import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST() {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
    return NextResponse.json({ data: posts })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
