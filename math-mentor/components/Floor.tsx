import React from "react"

const Floor = () => {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[100, 100, 3]} />
            <meshStandardMaterial color={'#fffffe'} />
        </mesh>
    )
}

export default Floor
