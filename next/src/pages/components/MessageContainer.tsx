import React, { type ReactNode } from "react"
import MessageBubble from "./MessageBubble"

interface IMessageContainer {
    conversations: Array<{
        message: ReactNode
        isSentByUser: boolean
    }>
    useRefHook: React.RefObject<HTMLDivElement>
}

const MessageContainer = ({ conversations, useRefHook }: IMessageContainer) => {
    return (
        <div className="flex h-[100%] w-[100%] flex-col overflow-auto py-5" ref={useRefHook}>
            {conversations.map(e => (
                <MessageBubble key={e.message as string} isSentByUser={e.isSentByUser}>
                    {e.message}
                </MessageBubble>
            ))}
        </div>
    )
}

export default MessageContainer
