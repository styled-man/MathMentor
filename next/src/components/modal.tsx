import React from "react"
import { useState } from "react"

interface IModal {
    yPosition: number
    userProblem: string
    infoForUser: string
}

const Modal = ({ userProblem, yPosition, infoForUser }: IModal) => {
    const [isModalSmall, setIsModalSmall] = useState<boolean>(true)

    return (
        <>
            {isModalSmall && (
                <div
                    className="fixed bottom-0 left-0 right-0 top-0 z-40 cursor-pointer backdrop-blur"
                    onClick={() => setIsModalSmall(false)}
                />
            )}

            <div
                style={{
                    top: isModalSmall ? yPosition : 0,
                    position: isModalSmall ? "absolute" : "fixed",
                }}
                className={`${
                    isModalSmall ? "small-modal" : "large-modal"
                } cursor-pointer bg-gray-200 p-2 shadow-2xl duration-1000`}
                onClick={() => {
                    setIsModalSmall(!isModalSmall)
                }}
            >
                You might need to revisit:{" "}
                <span className="font-bold text-red-500">{userProblem}</span>
                <br />
                {infoForUser}
            </div>
        </>
    )
}

export default Modal
