import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {  
    const { email } = await req.json()
    try {
        let { data: posts, error } = await supabase
            .from("posts")
            .select("*")
            .eq("author", email)
        return NextResponse.json({ data: posts })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
