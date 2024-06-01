import { NextResponse } from "next/server"
import supabase from "@/utils/supabase"

export async function POST(req) {
    const { user, profileData } = await req.json()
    try {
        const { data, error } = await supabase
            .from("users")
            .update({ name: profileData.name, position: profileData.position, department: profileData.department, institution: profileData.institution })
            .eq("id", user.id)
            .select()
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
