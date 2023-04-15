import { type NextApiHandler } from "next"
import { uploadImage } from "~/server/api/azure-helpers"

const handler: NextApiHandler = async (request, response) => {
    const { name, preview } = request.body as Record<string, string>

    if (!name || !preview) {
        response.status(400).send("missing data")
        return
    }

    const imageLink = await uploadImage(preview, name)

    console.log("image link:", imageLink)

    response.status(200).send({ url: imageLink })
}

export default handler

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "50mb", // Set desired value here
        },
    },
}
