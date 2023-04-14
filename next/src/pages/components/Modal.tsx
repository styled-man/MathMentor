import React from "react"
import { useState } from "react"
import Link from "next/link"

interface IModal {
    yPosition: number
    userProblem: string
    infoForUser: string
    youtubeLink?: string
    youtubeLinkTitle?: string
    moreInfoForUser?: string
}

const Modal = ({
    userProblem,
    yPosition,
    infoForUser,
    moreInfoForUser,
    youtubeLink,
    youtubeLinkTitle,
}: IModal) => {
    const [isModalSmall, setIsModalSmall] = useState<boolean>(true)

    return (
        <>
            <div
                style={{
                    top: isModalSmall ? yPosition : 0,
                }}
                className={`${isModalSmall ? "small-modal" : "large-modal"}
                ml-5 cursor-pointer bg-gray-200 p-2 shadow-2xl duration-300`}
                onClick={() => {
                    setIsModalSmall(!isModalSmall)
                }}
            >
                You might need to revisit:{" "}
                <span className="font-bold text-red-500">{userProblem}</span>
                <br />
                {infoForUser}
                <span style={{ display: isModalSmall ? "none" : "initial" }}>
                    <br />
                    {moreInfoForUser}
                    <br />
                    Here is a video that might help out:{" "}
                    <Link href={youtubeLink || ""} target="_blank" className="text-blue-800 underline">
                        {youtubeLinkTitle||youtubeLink}
                    </Link>
                </span>
            </div>
        </>
    )
}

export default Modal
