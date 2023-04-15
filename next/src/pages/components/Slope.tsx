import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"
import { useFrame, useThree } from "react-three-fiber"

type GLTFResult = GLTF & {
    nodes: {
        Text: THREE.Mesh
    }
    materials: {
        ["Material.002"]: THREE.MeshStandardMaterial
    }
}

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/slope.glb") as GLTFResult
    const ref = useRef<THREE.Mesh>(null!)
    // useThree
    const { viewport, camera } = useThree()
    const randZ = Math.random() * 2
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, randZ])

    useFrame((state, dt) => {
        ref.current.position.y -= 0.0065

        if (ref.current.position.y < -height - 9) {
            ref.current.position.y = Math.random() * 10 + 9
            ref.current.position.x = Math.random() * width - width / 2
        }
    })
    return (
        <group {...props} dispose={null}>
            <mesh
                scale={1.8}
                rotation={[Math.PI / 2, -0.35, 0]}
                position={[-7, 20, -1.5]}
                ref={ref}
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials["Material.002"]}
            />
        </group>
    )
}

useGLTF.preload("/slope.glb")
