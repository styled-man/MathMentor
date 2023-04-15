import { type NextPage } from "next"
import DragAndDrop from "@/components/DragAndDrop"
import Scene from "@/components/Scene"
import React from "react"

const Home: NextPage = () => {
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
        <div className="relative">
            <Scene />
            <div className="absolute top-[50%] translate-y-[-60%]  pl-5">
                <h1 className="text-8xl mb-10">
                    Math<span className="font-bold">Mentor</span>
                </h1>
                <DragAndDrop />
            </div>
        </div>
    )
}

export default Home
