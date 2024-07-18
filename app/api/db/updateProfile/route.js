import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {
    const { user, profileData } = await req.json()
    try {
        const { data, error } = await supabaseAdmin
            .from("users")
            .update({ name: profileData.name, position: profileData.position, department: profileData.department, institution: profileData.institution, bio: profileData.bio, orcid: profileData.orcid,  socials: [{twitter: profileData.twitter || null, linkedIn: profileData.linkedIn || null, googleScholar: profileData.googleScholar || null }] })
            .eq("id", user.id)
            .select()
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
