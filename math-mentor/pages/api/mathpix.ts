import { makeMathpixCall } from "@/utils/mathpix-helpers"
import { type NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
    const mathpix = await makeMathpixCall(req.body.fileUrl)

    console.log(mathpix)

    res.status(200).send(mathpix)
}

export default handler
