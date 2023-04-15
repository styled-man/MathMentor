import React from "react"

interface GlassmorphismProps {
    children: React.ReactNode
}

const Glassmorphism: React.FC<GlassmorphismProps> = ({ children }) => {
    return (
        <div className="rounded-md border border-gray-100 bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-md backdrop-filter">
            {children}
        </div>
    )
}

export default Glassmorphism
