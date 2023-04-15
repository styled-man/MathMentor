export interface youtubeRecommendation {
  title: string
  description: string
  thumbnail: string
  url: string
}

const API_URL = "https://youtube.googleapis.com/youtube/v3/search"

export const getYoutubeRecommendations = async (keywords: string): Promise<[youtubeRecommendation] | void> => {
  console.log("Got here")
  console.log(process.env.YOUTUBE_API_KEY)

  const queryParams = new URLSearchParams({
    part: "snippet",
    order: "relevance",
    q: "college algebra",
    type: "video",
    key: process.env.YOUTUBE_API_KEY as string,
  })

  const options: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }

  try {
    const response = await fetch(`${API_URL}?${queryParams.toString()}`, options)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
