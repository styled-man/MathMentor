import React, { Children, type ReactNode } from "react"

interface IMessageBubble {
    isSentByUser: boolean
    children: ReactNode
}

const MessageBubble = ({ isSentByUser, children }: IMessageBubble) => {
    return (
        <div
            style={{
                backgroundColor: isSentByUser ? "blue" : "grey",
                marginLeft: isSentByUser ? "auto" : "1.25rem",
                marginRight: isSentByUser ? "1.25rem" : "auto",
            }}
            className="mb-1 w-fit  max-w-[90%]  break-all rounded-2xl p-5 text-white"
        >
            {children}
        </div>
    )
}

export default MessageBubble
