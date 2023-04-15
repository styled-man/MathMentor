import { Youtube_Data, Youtube_Search_Result } from "@/types/Youtube_Types"
const API_URL = "https://youtube.googleapis.com/youtube/v3/search"

export const getYoutubeRecommendations = async (keywords: string): Promise<Youtube_Data[]> => {
    const queryParams = new URLSearchParams({
        part: "snippet",
        order: "relevance",
        q: keywords,
        type: "video",
        key: process.env.YOUTUBE_API_KEY as string,
    })

    const options: RequestInit = {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }

    const response = await fetch(`${API_URL}?${queryParams.toString()}`, options)
    const data = await response.json()

    const items = data.items as Youtube_Search_Result[]
    return items.map(({ id, snippet }) => ({
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${id.videoId}`,
    }))
}
