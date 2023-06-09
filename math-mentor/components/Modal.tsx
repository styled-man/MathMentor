import React, { useEffect, useRef } from "react"
import { useState } from "react"
import Link from "next/link"
import { HiOutlineInformationCircle } from "react-icons/hi"
import { type IModalData } from "./ModalData"

interface IModal {
    yPosition: number
    userProblem: string
    infoForUser: string
    youtubeLink?: string
    youtubeLinkTitle?: string
    moreInfoForUser?: string
    isModalSmall: boolean
    modalRef: React.RefObject<HTMLDivElement>
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
    modalRef,
}: IModal) => {
    return (
        <div
            ref={modalRef}
            style={{
                top: isModalSmall ? yPosition : 0,
                maxHeight: "95%",
            }}
            className={`${isModalSmall ? "small-modal" : "large-modal"}
ml-5 h-fit cursor-pointer rounded border-4 border-double border-gray-500 bg-white p-2 shadow-2xl duration-500`}
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

                {youtubeLink && (
                    <>
                        Here is a video that might help out:{" "}
                        <Link
                            href={youtubeLink || ""}
                            target="_blank"
                            className="text-blue-800 underline"
                        >
                            {youtubeLinkTitle || youtubeLink}
                        </Link>
                    </>
                )}
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
}

const ModalContainer = (props: IModalContainer) => {
    const modalRef = useRef<HTMLDivElement>(null)

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
                className="absolute left-[-40px] cursor-pointer rounded-full bg-white"
                style={{
                    top: props.yPosition,
                }}
                onClick={() => {
                    setIsModalHidden(!isModalHidden)
                }}
            >
                <HiOutlineInformationCircle size={20} />
            </div>

            {isModalHidden || (
                <Modal
                    {...props}
                    modalRef={modalRef}
                    isModalSmall={isModalSmall}
                    setIsModalSmall={setIsModalSmall}
                />
            )}
        </>
    )
}

export default ModalContainer
