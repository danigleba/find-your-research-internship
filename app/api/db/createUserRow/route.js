import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {
    const { id, email, name, position, department, institution } = await req.json()
    const acceptLanguage = req.headers.get("accept-language")
    const locale = acceptLanguage ? acceptLanguage.split(",")[0] : "en"
    try {
        const { data, error } = await supabase
            .from("users")
            .insert([
                { id: id, email: email, name: name, position: position, department: department, institution: institution, locale: locale },
            ])
            .select()
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
