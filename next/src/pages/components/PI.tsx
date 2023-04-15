import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
    nodes: {
        Object_2: THREE.Mesh
    }
    materials: {
        ["Scene_-_Root"]: THREE.MeshStandardMaterial
    }
}

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/letra_pi.glb") as GLTFResult
    return (
        <group {...props} dispose={null}>
            <group>
                <group>
                    <mesh
                    scale={0.02}
                        castShadow
                        receiveShadow
                        geometry={nodes.Object_2.geometry}
                        material={materials["Scene_-_Root"]}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload("/letra_pi.glb")
