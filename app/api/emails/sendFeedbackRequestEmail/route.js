import { NextResponse } from "next/server"
import feedbackRequestTemplate from "@/components/emails/feedbackRequestTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
    const { user } = await req.json()
    try {
        const { data, error } = await resend.emails.send({
            from: "Portiko <collaborations@joinportiko.com>",
            to: user.email,
            subject: `${user.name.split(" ")[0]} - quick question`,
            react: feedbackRequestTemplate({ user: user }),
        })
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
