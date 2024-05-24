import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Portiko <collabs@joinportiko.com>",
            to: ["daniglebapuig@gmail.com"],
            subject: "Hello world",
            text: "Hello! This is a test",
        })
        return NextResponse.json({ data: data })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
