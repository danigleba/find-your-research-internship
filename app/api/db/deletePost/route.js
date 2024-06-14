import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const { id } = await req.json()
    try {
        const { data, error } = await supabaseAdmin
            .from("posts")
            .delete()
            .eq("id", id)
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
