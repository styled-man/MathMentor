import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

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
    return (
        <group {...props} dispose={null}>
            <mesh
            scale={1.8}
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials["Material.002"]}
            />
        </group>
    )
}

useGLTF.preload("/slope.glb")
