import React from "react"

interface IMessageBubble {
    isSentByUser: boolean
    message: string
}

const MessageBubble = ({ isSentByUser, message }: IMessageBubble) => {
    return (
        <div
            style={{
                backgroundColor: isSentByUser ? "blue" : "grey",
                marginLeft: isSentByUser ? "auto" : "1.25rem",
                marginRight: isSentByUser ? "1.25rem" : "auto",
            }}
            className="mb-1 w-fit  max-w-[90%]  break-all rounded-2xl p-5 text-white"
        >
            {message}
        </div>
    )
}

export default MessageBubble
