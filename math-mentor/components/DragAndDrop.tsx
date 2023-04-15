import React, { type FormEvent, useRef, type MutableRefObject, useState } from "react"
import { uploadToS3, type Response } from "./s3Utils"
import { MathpixTextType } from "../utils/mathpix-helpers"
import { useRouter } from "next/router"

type Props = {
    className?: string
}
interface Data {
    content: string
    question: string
}

interface Solution {
    mistake: string
    topic: string
}

const FileUploadForm = ({ className }: Props) => {
    const router = useRouter()
    const fileInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    // upload document to aws and then call math pix
    const uploadToAWS = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("uploading to aws")

        if (!fileInputRef.current || !fileInputRef.current.files) {
            return
        }
        const file = fileInputRef.current.files[0]
        if (!file) {
            alert("Please select a file")
            return
        }

        try {
            const response = (await uploadToS3(file)) as Response
            console.log("File uploaded successfully:", response)

            router.push(`/learn?fileKey=${response.Key}`)
        } catch (error) {
            console.error("Error uploading file:", error)
        }
    }

    // TODO: call this function to start the process: await getMathpix()

    // gets problem from the document and then goes to getting the solution
    const getMathpix = async (fileUrl: string) => {
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={uploadToAWS} className={className}>
            <input className="text-black relative left-2" ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" />
        </form>
    )
}

export default FileUploadForm
