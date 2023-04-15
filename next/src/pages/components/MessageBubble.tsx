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
            className="mb-1 w-fit min-w-[45%] max-w-[90%] rounded-2xl p-5 text-white"
        >
            {message}
        </div>
    )
}

export default MessageBubble
