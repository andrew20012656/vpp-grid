
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Transformer(props) {
  const { nodes, materials } = useGLTF('/models/transformer2.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.Material} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Transformer_1.geometry}
        material={materials.Material__196a}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Transformer_2.geometry}
        material={materials['Material__1286557106.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Transformer_3.geometry}
        material={materials['Material__1286557105.001']}
      />
    </group>
  )
}

useGLTF.preload('/models/transformer2.glb')