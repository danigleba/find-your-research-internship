import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {
    const { user, postData } = await req.json()
    try {
        const { data, error } = await supabase
            .from("posts")
            .insert([
                { description: postData.description, title: postData.title, categories: [postData.categories], author: user.id },
            ])
            .select()
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
