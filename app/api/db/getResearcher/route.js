import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {  
    const { researcherId } = await req.json()
    try {
        let { data: researcher, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("id", researcherId)
        return NextResponse.json({ data: researcher })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
