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
    const { nodes, materials } = useGLTF("/pom.glb") as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
            scale={2}
                castShadow
                receiveShadow
                geometry={nodes.Text.geometry}
                material={materials["Material.002"]}
                position={[4.52, 1.45, -3.82]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </group>
    )
}

useGLTF.preload("/pom.glb")
