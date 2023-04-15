import { OrbitControls } from "@react-three/drei"
import React from "react"
import { Canvas } from "react-three-fiber"
import Floor from "./Floor"
import { Debug, Physics, RigidBody } from "@react-three/rapier"
import { SoftShadows } from "@react-three/drei"
import PIModel from './Threepointonefour'
import AE from './EEqualsMCSquared'
import AX from './AX'
import PI from './PI'

const Scene = () => {
    return (
        <Canvas
            className="relative m-0 p-0"
            style={{ height: "100vh", width: "100vw" }}
            camera={{ position: [0, 5, 10], fov: 75 }}
            shadows
        >
            <SoftShadows focus={0.1} samples={5} size={8} />
            <ambientLight intensity={0.75} />
            <directionalLight castShadow position={[10, 10, 10]} intensity={3} rotation={[0, 4, 1]} />
            <Physics>
            {/* <Debug /> */}
                <RigidBody position={[0,1,0]}>
                    <PIModel />
                </RigidBody>
                <RigidBody position={[8,4,2]} rotation={[1.12, 1.2, 1.001]}>
                    <PIModel />
                </RigidBody>
                <RigidBody position={[1,4,10]} rotation={[4.62, 1.8, 2.001]}>
                    <AE />
                </RigidBody>
                <RigidBody position={[4,6,8]} rotation={[4.62, 1.8, 2.001]}>
                    <AX />
                </RigidBody>
                <RigidBody position={[2,3,-2]} rotation={[4.62, 1.8, 2.001]}>
                    <PI />
                </RigidBody>
                <RigidBody position={[-4,6,4]} rotation={[4.62, 1.8, 2.001]}>
                    <PI />

                </RigidBody>
                <RigidBody friction={0.8} restitution={1} type="fixed">
                    <Floor />
                </RigidBody>
            </Physics>
            {/* <OrbitControls /> */}
        </Canvas>
    )
}

export default Scene
