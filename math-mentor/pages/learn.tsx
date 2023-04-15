import Image from "next/image"
import React, { type ReactNode, useRef, useState, useEffect } from "react"
// import Modal from "@/components/Modal"
import MessageContainer from "@/components/MessageContainer"
import Form from "@/components/Form"
import { useRouter } from "next/router"

//! Use this code for the api. the filter removes the loading message from the array
//! setConversations([
//!     ...conversations.filter(e => e.shouldBeFilteredOut != true),
//!     { message: **BOTS MESSAGE**, isSentByUser: false },
//! ])

const Learn = () => {
    const router = useRouter()
    const { fileUrl } = router.query
    console.log(fileUrl)
    return (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center bg-slate-100">
            <div className="relative m-3 ml-4 h-[95vh] w-[50vw] overflow-hidden rounded-md">
                <Image src={`https://math-mentor.s3.amazonaws.com/${fileUrl}`} alt="Image of fileUrl" fill={true} />
            </div>
            <div>
                <InteractivityArea />
            </div>
        </div>
    )
}

function InteractivityArea() {
    const [inputText, setInputText] = useState("")
    // const [isAllModalHidden, setIsAllModalHidden] = useState<boolean>(false)

    const Filter = () => (
        <div className="flex gap-3">
            <div className="dot h-2 w-2 animate-pulse rounded-full bg-white"></div>
            <div className="dot h-2 w-2 animate-pulse rounded-full bg-white delay-[250ms]"></div>
            <div className="dot h-2 w-2 animate-pulse rounded-full bg-white delay-500"></div>
        </div>
    )

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

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setConversations([
            { message: "**BOTS MESSAGE**", isSentByUser: false },
            { message: <Filter />, isSentByUser: false },
        ])
    }, [])

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
            </div>

            <Form handleSubmit={handleSubmit} inputText={inputText} handleInputChange={handleInputChange} />
        </>
    )
}

export default Learn
