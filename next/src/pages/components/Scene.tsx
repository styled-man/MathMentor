import { OrbitControls } from "@react-three/drei"
import React from "react"
import { Canvas } from "react-three-fiber"
import Floor from "./Floor"
import { Debug, Physics, RigidBody } from "@react-three/rapier"
import { SoftShadows } from "@react-three/drei"
import Slope from './Slope'
import EE from './EEqualsMCSquared'
import THR from './Threepointonefour'
import Infinity from './Infinity'
import POM from './POM'
import D from './Division'
import AX from "./AX"
import AS from "./AS"

import { DepthOfField, EffectComposer } from "@react-three/postprocessing"

const Scene = () => {
    return (
        <Canvas
            className="relative m-0 p-0"
            style={{ height: "100vh", width: "100vw" }}
            camera={{ position: [0, 5, 10], fov: 75 }}
            shadows
        >
            {/* <fog attach="fog" args={["white", 0, 20]} /> */}
            <SoftShadows focus={0.1} samples={5} size={8} />
            <ambientLight intensity={0.75} />
            <directionalLight
                castShadow
                position={[10, 10, 10]}
                intensity={3}
                rotation={[0, 4, 1]}
            />
                    <THR />
                    <Slope rotation={[Math.PI / 2, 0, 0]} />
                    <EE />
                    <Infinity rotation={[-Math.PI / 2, 0, 0]} />
                    <POM />
                    <D />
                    <AX />
                    <AS />
            {/* <EffectComposer multisampling={0}>
                <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={14} height={700} />
            </EffectComposer> */}
            {/* <OrbitControls /> */}
        </Canvas>
    )
}

export default Scene
