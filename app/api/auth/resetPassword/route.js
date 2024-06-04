import { NextResponse } from "next/server"

export async function POST(req) {
    const { newPassword, accessToken } = await req.json()
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
              "Authorization" : `Bearer ${accessToken}`
            },
            body: JSON.stringify({ password: newPassword })
        })
        const data = await response.json()

        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}