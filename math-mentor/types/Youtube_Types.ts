interface Youtube_Data {
    title: string
    description: string
    thumbnail: string
    url: string
}

interface Youtube_Search_Result {
    id: { videoId: string }
    snippet: {
        title: string
        description: string
        thumbnails: { default: { url: string } }
    }
}

export type { Youtube_Data, Youtube_Search_Result }
