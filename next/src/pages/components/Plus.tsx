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
    const { nodes, materials } = useGLTF("/plus.glb") as GLTFResult
    const ref = useRef<THREE.Mesh>(null!)
    // useThree
    const { viewport, camera } = useThree()
    const randZ = Math.random() * 2
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, randZ])

    useFrame((state, dt) => {
        ref.current.position.y -= 0.7055

        if (ref.current.position.y < -height - 15) {
            ref.current.position.y = Math.random() * 14 + 13
            ref.current.position.x = Math.random() * width - width / 2
        }
    })
    return (
        <group {...props} dispose={null}>
            <mesh
                ref={ref}
                scale={1.4}
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials["Material.002"]}
                position={[4.52, 21.45, -1.82]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload("/plus.glb")
