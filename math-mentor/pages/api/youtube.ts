import { type NextApiHandler } from "next"
import { getYoutubeRecommendations } from "@/utils/youtube-helpers"

const handler: NextApiHandler = async (request, response) => {
  const { keywords } = request.query as Record<string, string>

  if (!keywords) {
    response.status(400).send("missing data")
    return
  }

  const data = await getYoutubeRecommendations(keywords)
  response.status(200).send(data)
}

export default handler
