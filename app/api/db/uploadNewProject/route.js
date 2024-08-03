import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const { user, postData } = await req.json()
    console.log(user)
    console.log(postData)
    try {
        const { data, error } = await supabaseAdmin
            .from("projects")
            .insert([
                { description: postData.description, title: postData.title, categories: [postData.categories], author: user.id},
            ])
            .select()

        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
