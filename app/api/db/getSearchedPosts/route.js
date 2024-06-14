import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin";

export async function POST(req) {
    const { search } = await req.json()
    try {
        const { data, error } = await supabaseAdmin
        .from("posts")
        .select()
        .ilike("title", `%${search}%`);
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
