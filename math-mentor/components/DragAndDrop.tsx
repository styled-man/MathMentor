import React, { type FormEvent, useRef, type MutableRefObject } from "react"
import { uploadToS3 } from "./s3Utils"

const FileUploadForm = () => {
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
        <>
        <div className="">

        </div>
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit}>
            <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" />
            <button type="submit">Upload</button>
        </form>
        </>
    )
}

export default FileUploadForm
