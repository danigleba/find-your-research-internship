import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {  
    const { id } = await req.json()
    try {
        let { data: users, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("id", id)
        return NextResponse.json({ data: users })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
