import { uploadImage } from "./azure-helpers"

interface MathpixTokenType {
    app_token: string
    app_token_expires_at: string
}

async function generateMathpixToken(): Promise<MathpixTokenType | null> {
    const tokenFetchResult = await fetch("api.mathpix.com/v3/app-tokens", {
        method: "POST",
        headers: {
            app_id: "",
            app_key: "",
        },
    })
    if (tokenFetchResult == null) {
        return null
    }

    return tokenFetchResult.json() as unknown as MathpixTokenType
}

interface MathpixDataType {
    type: string
    value: string
}

interface MathpixTextType {
    auto_rotate_confidence: number
    auto_rotate_degrees: number
    confidence: number
    confidence_rate: number
    data: MathpixDataType[]
    is_handwritten: boolean
    is_printed: boolean
    request_id: string
    text: string
    version: string
}

export async function makeMathpixCall(blobName: string, file: string): Promise<MathpixTextType> {
    // FUNCTION MAKES Mathpix route call, but needs to upload image before hand.

    const fileSRC: string = await uploadImage(blobName, file)

    // TODO: Implement use of TOKENS
    const data = await fetch("https://api.mathpix.com/v3/text", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            app_id: process.env.MATHPIX_APP_ID,
            app_key: process.env.MATHPIX_APP_KEY,
        },
        body: JSON.stringify({
            src: fileSRC,
            formats: ["text", "data"],
            data_options: {
                include_asciimath: true,
            },
        }),
    })

    return data.json() as unknown as MathpixTextType
}
