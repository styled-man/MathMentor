import React, { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import { HiOutlineInformationCircle } from "react-icons/hi"

interface IModal {
    yPosition: number
    userProblem: string
    infoForUser: string
    youtubeLink?: string
    youtubeLinkTitle?: string
    moreInfoForUser?: string
    isModalSmall: boolean
    setIsModalSmall: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({
    userProblem,
    yPosition,
    infoForUser,
    moreInfoForUser,
    youtubeLink,
    youtubeLinkTitle,
    setIsModalSmall,
    isModalSmall,
}: IModal) => {
    return (
        <div
            style={{
                top: isModalSmall ? yPosition : 0,
            }}
            className={`${isModalSmall ? "small-modal" : "large-modal"}
ml-5 cursor-pointer rounded bg-white p-2 shadow-2xl duration-300`}
            onClick={() => {
                setIsModalSmall(!isModalSmall)
            }}
        >
            You might need to revisit: <span className="font-bold text-red-500">{userProblem}</span>
            <br />
            {infoForUser}
            <span style={{ display: isModalSmall ? "none" : "initial" }}>
                <br />
                {moreInfoForUser}
                <br />
                Here is a video that might help out:{" "}
                <Link href={youtubeLink || ""} target="_blank" className="text-blue-800 underline">
                    {youtubeLinkTitle || youtubeLink}
                </Link>
            </span>
        </div>
    )
}

interface IModalContainer {
    yPosition: number
    userProblem: string
    infoForUser: string
    youtubeLink?: string
    youtubeLinkTitle?: string
    moreInfoForUser?: string
    isAllModalHidden: boolean
    setIsAllModalHidden: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContainer = (props: IModalContainer) => {
    const [isModalSmall, setIsModalSmall] = useState<boolean>(true)
    const [isModalHidden, setIsModalHidden] = useState<boolean>(false)

    useEffect(() => {
        if (props.isAllModalHidden == true) {
            setIsModalHidden(props.isAllModalHidden)
        }
    }, [props.isAllModalHidden])

    return (
        <>
            <div
                className="absolute left-[-40px] rounded-full bg-white cursor-pointer"
                style={{
                    top: props.yPosition,
                }}
                onClick={() => {
                    setIsModalHidden(!isModalHidden)
                    props.setIsAllModalHidden(false)
                }}
            >
                <HiOutlineInformationCircle size={20} />
            </div>

            {isModalHidden || (
                <Modal {...props} isModalSmall={isModalSmall} setIsModalSmall={setIsModalSmall} />
            )}
        </>
    )
}

export default ModalContainer
