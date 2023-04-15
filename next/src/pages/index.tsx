import { type NextPage } from "next"
import DragAndDrop from "./components/DragAndDrop"
import { useEffect } from "react"
import { api } from "~/utils/api"
import z from "zod"

const Home: NextPage = () => {
    const { data, error } = api.document.youtubeRecommendations.useQuery({ keywords: "college algebra" }, { onError: err => console.error(err) })

    if (error) {
        // handle error
        return <div>Error: {error.message}</div>
    }

    if (!data) {
        // data is still loading
        return <div>Loading...</div>
    }

    const item = [
        {
            id: "1",
            name: "Item 1",
            preview: "https://picsum.photos/200/300",
        },
        {
            id: "2",
            name: "Item 2",
            preview: "https://picsum.photos/200/300",
        },
        {
            id: "3",
            name: "Item 3",
            preview: "https://picsum.photos/200/300",
        },
    ]

    return (
        <>
            <h1>Home</h1>
            <DragAndDrop items={item} />
        </>
    )
}

export default Home
