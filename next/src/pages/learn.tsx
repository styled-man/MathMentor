import Image from "next/image"
import React, { type ReactNode, useRef, useState } from "react"
import Modal from "./components/Modal"
import MessageContainer from "./components/MessageContainer"
import Form from "./components/Form"
//! Use this code for the api. the filter removes the loading message from the array
//! setConversations([
//!     ...conversations.filter(e => e.shouldBeFilteredOut != true),
//!     { message: **BOTS MESSAGE**, isSentByUser: false },
//! ])

const Learn = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center bg-slate-100">
            <div className="relative m-3 ml-4 h-[95vh] w-[50vw] overflow-hidden rounded-md">
                <Image
                    src={
                        "https://images.freeimages.com/images/previews/54c/random-photography-3-1143357.jpg"
                    }
                    alt="sheesh"
                    fill={true}
                />
            </div>
            <div>
                <InteractivityArea />
            </div>
        </div>
    )
}

function InteractivityArea() {
    const [inputText, setInputText] = useState("")
    const [isAllModalHidden, setIsAllModalHidden] = useState<boolean>(false)

    const [conversations, setConversations] = useState<
        Array<{
            message: ReactNode
            isSentByUser: boolean
            shouldBeFilteredOut?: boolean
        }>
    >([])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }

    const Filter = () => (
        <div className="flex gap-3">
            <div className="dot h-2 w-2 animate-pulse rounded-full bg-white"></div>
            <div className="dot h-2 w-2 animate-pulse rounded-full bg-white delay-[250ms]"></div>
            <div className="dot h-2 w-2 animate-pulse rounded-full bg-white delay-500"></div>
        </div>
    )

    const scrollRef = useRef<HTMLDivElement>(null)

    const [modalData, setModalData] = useState([
        {
            userProblem: "Vector Mathematics",
            infoForUser: "Information",
            yPosition: 100,
            youtubeLink: "https://www.youtube.com/",
            youtubeLinkTitle: "Math me like I'm 5",
            moreInfoForUser: "more information",
        },
        {
            userProblem: "Vector Mathematics",
            infoForUser:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.",
            yPosition: 200,
            youtubeLink: "https://www.youtube.com/",
            youtubeLinkTitle: "Math me like I'm 5",
            moreInfoForUser:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, laboriosam.Lorem",
        },
        {
            userProblem: "Vector Mathematics",
            infoForUser: "Information1",
            yPosition: 300,
            youtubeLink: "https://www.youtube.com/",
            youtubeLinkTitle: "Math me like I'm 5",
            moreInfoForUser: "more information",
        },
    ])

    const [selectedModal, setSelectedModal] = useState(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(`User submitted: ${inputText}`)
        if (inputText !== "") {
            setConversations([
                ...conversations.filter(e => e.shouldBeFilteredOut != true),
                { message: inputText, isSentByUser: true },
                { message: <Filter />, isSentByUser: false, shouldBeFilteredOut: true },
            ])
        }
        setInputText("")
        setIsAllModalHidden(true)
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: "smooth" })
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
        }, 0)
    }

    return (
        <>
            <div className="relative -top-[1.75rem] right-3 h-[89vh] w-[50vw]">
                <MessageContainer conversations={conversations} useRefHook={scrollRef} />

                {modalData.map(e => (
                    <Modal
                        key={e.infoForUser}
                        userProblem={e.userProblem}
                        infoForUser={e.infoForUser}
                        yPosition={e.yPosition}
                        youtubeLink={e.youtubeLink}
                        youtubeLinkTitle={e.youtubeLinkTitle}
                        moreInfoForUser={e.moreInfoForUser}
                        isAllModalHidden={isAllModalHidden}
                        setIsAllModalHidden={setIsAllModalHidden}
                    />
                ))}
            </div>

            <Form
                handleSubmit={handleSubmit}
                inputText={inputText}
                handleInputChange={handleInputChange}
            />
        </>
    )
}

export default Learn
