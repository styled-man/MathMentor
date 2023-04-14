import React from "react"
import { useState } from "react"
import Link from "next/link"

interface IModal {
    yPosition: number
    userProblem: string
    infoForUser: string
    youtubeLink?: string
    moreInfoForUser?: string
}

const Modal = ({ userProblem, yPosition, infoForUser, moreInfoForUser, youtubeLink }: IModal) => {
    const [isModalSmall, setIsModalSmall] = useState<boolean>(true)

    return (
        <>
            {
                <div
                    style={{
                        backdropFilter: isModalSmall ? "blur(0px)" : "blur(10px)",
                        height: "100vh",
                        width: "100vw",
                        zIndex: isModalSmall ? 10 : 49,
                    }}
                    className="fixed top-0 h-screen w-screen cursor-pointer duration-300"
                    onClick={() => setIsModalSmall(true)}
                />
            }

            <div
                style={{
                    top: isModalSmall ? yPosition : 0,
                }}
                className={`${
                    isModalSmall ? "small-modal" : "large-modal"
                } w-[60ch] cursor-pointer bg-gray-200 p-2 shadow-2xl duration-300`}

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
                    <Link href={youtubeLink || ""} target="_blank">
                        {youtubeLink}
                    </Link>
                </span>
            </div>
        </>
    )
}

export default Modal
