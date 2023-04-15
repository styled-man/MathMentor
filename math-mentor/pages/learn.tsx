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

type Props = {
    className?: string
}

interface MathpixDataType {
    type: string
    value: string
}

interface MathpixTextType {
    auto_rotate_confidence: number
    auto_rotate_degrees: number
    confidence: number
    confidence_rate: number
    data: MathpixDataType[]
    is_handwritten: boolean
    is_printed: boolean
    request_id: string
    text: string
    version: string
}
interface Data {
    content: string
    question: string
}

interface Solution {
    mistake: string
    topic: string
}

const Learn = () => {
    const router = useRouter()
    const { fileUrl } = router.query
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
    const router = useRouter()
    const { fileUrl } = router.query

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
            { message: "**", isSentByUser: false },
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

    const [data, setData] = useState<string>("")
    useEffect(() => {
        setConversations([{ message: data, isSentByUser: false }])
    }, [])

    useEffect(() => {
        if (fileUrl==undefined) {
            return
        }
        getMathpix(`https://math-mentor.s3.amazonaws.com/${fileUrl}`)
        const getData =   async () => {
            await getMathpix(`https://math-mentor.s3.amazonaws.com/${fileUrl}`)
        }
        getData()
    }, [])

    console.log(fileUrl);
    

    // gets problem from the document and then goes to getting the solution
    const getMathpix = async (fileUrl: string) => {
        console.log("asdfasdf")
        const response = await fetch("/api/mathpix", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileUrl,
            }),
        })

        const data = (await response.json()) as MathpixTextType
        setData(data.text)

        console.log("mathplix data:", data)

        await extractData(data)
    }

    const extractData = async (problem: MathpixTextType) => {
        const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/extract_data`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mathpix_data: JSON.stringify({
                    text: problem.text,
                    data: problem.data,
                }),
            }),
        })

        const data = (await response.json()) as Data

        console.log("extracted data:", data)
        await getSolution(data)
    }

    const getSolution = async (problem: Data) => {
        const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT}/solution`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mathpix_question: problem.question,
                mathpix_raw: problem.content,
            }),
        })

        const data = (await response.json()) as Solution

        console.log("solution:", data)
    }

    return (
        <>
            <div className="relative -top-[1.75rem] right-3 h-[89vh] w-[50vw]">
                <MessageContainer conversations={conversations} useRefHook={scrollRef} />
            </div>

            <Form
                handleSubmit={e => {
                    e.preventDefault()
                }}
                inputText={inputText}
                handleInputChange={handleInputChange}
            />
        </>
    )
}

export default Learn
