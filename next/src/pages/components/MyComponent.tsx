import React from "react"
import Glassmorphism from "./Glassmorphism"

const MyComponent: React.FC = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <Glassmorphism>
                <h1 className="text-4xl font-bold">Hello, Glassmorphism!</h1>
                <p className="mt-4">This is a Glassmorphism component.</p>
            </Glassmorphism>
        </div>
    )
}

export default MyComponent
