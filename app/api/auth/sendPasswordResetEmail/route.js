import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {
    const { email } = await req.json()
    try {
        let { data, error } = await supabase.auth.resetPasswordForEmail(email)
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}