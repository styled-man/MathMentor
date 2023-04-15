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
    const { nodes, materials } = useGLTF("/threepointonefour.glb") as GLTFResult
    const ref = useRef<THREE.Mesh>(null!)
    // useThree
    const { viewport, camera } = useThree()
    const randZ = Math.random() * 2
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, randZ])

    useFrame((state, dt) => {
        ref.current.position.y -= 0.0075

        if (ref.current.position.y < -height - 9) {
            ref.current.position.y = Math.random() * 11 + 10
            ref.current.position.x = Math.random() * width - width / 2
        }
    })
    return (
        <group {...props} dispose={null}>
            <mesh
                scale={1.6}
                ref={ref}
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials["Material.002"]}
                position={[4.52, 33.45, -3.82]}
                rotation={[Math.PI / 2, 0.5, 0.75]}
            />
        </group>
    )
}

useGLTF.preload("/threepointonefour.glb")
