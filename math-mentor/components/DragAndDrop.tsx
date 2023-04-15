import React, { type FormEvent, useRef, type MutableRefObject } from "react"
import { TbFileUpload } from "react-icons/tb"
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
            <label className="block text-lg font-medium text-gray-700 mb-2 left-2 relative">Select file</label>
            <div className="flex items-center">
                <input
                    className="appearance-none bg-white rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none relative -left-2 focus:shadow-outline"
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" type="submit">
                    Upload
                </button>
            </div>
        </form>
    )
}

export default FileUploadForm
