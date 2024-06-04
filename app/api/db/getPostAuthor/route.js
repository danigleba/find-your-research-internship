import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {  
    const { author_id } = await req.json()
    try {
        let { data: users, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", author_id)

        delete users[0].email
        return NextResponse.json({ data: users })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
