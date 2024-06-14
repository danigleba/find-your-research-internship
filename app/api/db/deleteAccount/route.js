import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const { id, email } = await req.json()
    try {
        const { data, error } = await supabaseAdmin.auth.admin.deleteUser(
            `afebaa4b-cd06-4a2d-8093-043424bb79a0`
        )
        const { dataPosts, errorPosts } = await supabaseAdmin
            .from("posts")
            .delete()
            .eq("author", email)

        const { dataUser, errorUser } = await supabaseAdmin
            .from("users")
            .delete()
            .eq("id", id)
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
