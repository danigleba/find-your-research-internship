import { NextResponse } from "next/server"
import supabaseAdmin from "@/utils/supabaseAdmin"

export async function POST(req) {  
    const { id } = await req.json()
    try {
        let { data: posts, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .in('id', [
                "fb3058cd-0fa5-4cb9-84c0-b637439513f0",
                "0b31b762-8938-4569-9747-6fb0ce32716b",
                "e263315f-8308-4314-bc7a-86fccf01790a",
                "4caa75c5-aed1-4b50-9541-837e7e226d1e",
                "d068c934-c077-46c3-91c2-a66853ca41e8",
                "cf5d8325-ccb7-476c-9a17-968aba1a1b95",
                "63af37e4-6554-4eb0-b132-14868806d974",
                "557bac08-d490-46a8-a753-bcc481f9e243",
                "557bac08-d490-46a8-a753-bcc481f9e243",
                "4c1c179c-2c6c-4120-954a-41657e5a71e6",
                "71122923-5333-4036-9a43-f2a9d9b79687",
                "71122923-5333-4036-9a43-f2a9d9b79687",
                "f55b164c-0af6-4f51-a1e3-58c74b464d37",
                "f55b164c-0af6-4f51-a1e3-58c74b464d37",
                "95055d52-5765-4b7a-8ade-63fe79ce69e2",
                "2d338ec5-716c-4f8e-b189-ccd1fe94b3b4",
                "cca58fd3-e0a3-4b41-a1f8-4a3849e0515b",
                "08de4fd8-e717-4292-99d6-073be164d9e5",
                "ee6cdf69-c138-4ad4-83e4-a966ababa555",
                "ee6cdf69-c138-4ad4-83e4-a966ababa555",
                "065f3896-0eb8-48dc-9113-3a4ae6d0d432",
                "8509f532-7aeb-4c24-b3ce-90646a76adfc",
                "43e895bf-d278-4007-80fa-81740003d84e",
                "56d7e1d2-0c67-4f7a-9ac0-9b73b25757bd",
                "c384360c-448f-4f99-9ea0-eb62f2bc510e",
                "d155f0a3-59a6-4ff4-b3fb-97524ecd2f54",
                "aa6e6360-fb1c-44f3-8b64-9604ce775a3f",
                "e9c5d92d-7b9c-4af3-8ad9-7493fdacef65",
                "d407f620-3e19-47a0-8eef-5ecd94db93e0",
                "f6ff9854-3d32-4f9c-9410-0d98995bad1c",
                "85f08097-893d-44a2-812d-39beee12d7d0",
                "a52ce00a-2388-471b-9076-9fcc2ab60f28",
                "d5daee48-2ef0-4e41-9f29-f486f189201d",
                "0b31b762-8938-4569-9747-6fb0ce32716b",
                "f497dfc1-948a-4171-bab0-9224be16f318",
                "0f1540eb-eaf6-417b-bcec-6199559431b0",
                "0456104d-5284-4d6e-b7f7-1175725031af",
                "f12cdde7-c4d9-41d1-8147-1e688bbe66a4",
                "f497dfc1-948a-4171-bab0-9224be16f318",
                "bd327a20-79a4-49ee-b6c2-1035287b5b06",
                "aead182f-52fd-463b-99e7-4eff8d1e6c64",
                "aa24eb01-9ce4-43b8-9e76-78de21096f93"
            ]);
            console.log(posts)
        return NextResponse.json({ data: posts })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
