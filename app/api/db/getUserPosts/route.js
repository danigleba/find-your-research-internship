import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {  
    const { id } = await req.json()
    try {
        let { data: posts, error } = await supabaseAdmin
            .from("posts")
            .select("*")
            .eq("author", id)
        return NextResponse.json({ data: posts })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
