import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const { id, title, description } = await req.json()
    try {
        const { data, error } = await supabaseAdmin
            .from("posts")
            .update({ title: title })
            .eq("id", id)
        
        const { dataDescription, errorDescription } = await supabaseAdmin
            .from("posts")
            .update({ description: description })
            .eq("id", id)
        return NextResponse.json({ data: dataDescription })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
