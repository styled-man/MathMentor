import React, { type ReactNode } from "react"
import ReactMarkdown from "react-markdown"
interface IMessageBubble {
    isSentByUser: boolean
    children: ReactNode
    isMessageFiller?: boolean
}

const MessageBubble = ({ isSentByUser, children, isMessageFiller = false }: IMessageBubble) => {
    return (
        <div
            style={{
                backgroundColor: isSentByUser ? "blue" : "#6b6b6d",
                alignSelf: isSentByUser ? "end" : "start",
            }}
            className="mx-5 mb-1 w-fit  max-w-[90%] break-all rounded-2xl p-5 text-white first:mt-[100%]"
        >
            {children}
        </div>
    )
}

export default MessageBubble
