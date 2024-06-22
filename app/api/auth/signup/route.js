import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const { email, password, name, position, department, institution } = await req.json()
    const acceptLanguage = req.headers.get("accept-language")
    const locale = acceptLanguage ? acceptLanguage.split(",")[0] : "en"
    try {
        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        const { dataDB, errorDB } = await supabaseAdmin
            .from("users")
            .insert([
                { id: data.user.id, email: email, name: name, position: position, department: department, institution: institution, locale: locale },
            ])
            .select()
            
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
