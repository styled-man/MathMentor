import React, { type FormEvent, useRef, type MutableRefObject } from "react"
import {TbFileUpload} from "react-icons/tb"
import { uploadToS3 } from "./s3Utils"
import Image from "next/image"

type Props = {
    className?: string
}

const FileUploadForm = ({ className }: Props) => {
    const fileInputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!fileInputRef.current || !fileInputRef.current.files) {
            return
        }
        const file = fileInputRef.current.files[0]
        if (!file) {
            alert("Please select a file")
            return
        }

        try {
            const response = await uploadToS3(file)
            console.log("File uploaded successfully:", response)
        } catch (error) {
            console.error("Error uploading file:", error)
        }
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit} className={className}>
            <input className="text-black" ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png"  />
            <button type="submit" >
                <TbFileUpload />
            </button>
        </form>
    )
}

export default FileUploadForm
