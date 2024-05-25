import { NextResponse } from "next/server"
import collabTemplate from "@/components/emails/collabTemplate"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
    const { author, user, title, comment} = await req.json()
    try {
        const { data, error } = await resend.emails.send({
            from: "Portiko <collaborations@joinportiko.com>",
            to: author.email,
            subject: `${user.name} wants to collaborate doing ${title}!`,
            react: collabTemplate({ author: author, user: user, title: title, comment: comment }),
        })
        return NextResponse.json({ data: data })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
