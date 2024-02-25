import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useLocation } from "react-router-dom";
import { GizmoHelper, GizmoViewport, Html, useGLTF, useTexture } from "@react-three/drei"
import { Canvas, useFrame, useLoader, useResource } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three"

import { useSelector, useDispatch } from 'react-redux'

import "./3D.scss"

export function Model({ textureSelected, scaleValue }) {
    // const gltf = useLoader(GLTFLoader, '/door-gltf/scene.gltf')
    // return <primitive object={gltf.scene} />

    const groupRef = useRef()
    const { nodes, materials } = useGLTF('/door-gltf/scene.gltf')
    const texture = useTexture(textureSelected.url);
    return (
        //   <group ref={groupRef} {...props} dispose={null}>
        <mesh castShadow receiveShadow
            scale={scaleValue} rotation={[0, 1.56, 0]}
            geometry={nodes.Door_Default_0.geometry}
        //material={materials['Material.001']}
        >
            <meshPhysicalMaterial map={texture} />
        </mesh>
        //  <mesh castShadow receiveShadow geometry={nodes.floatBufferViews.geometry} material={materials['Material.002']} /> 
        //   </group>
    )
}

useGLTF.preload("/door-gltf/scene.gltf");

const Scene = ({scaleValue}) => {
    let textureSelected = useSelector((state) => state.textureSelected)
    // textureSelected.wrapS = THREE.RepeatWrapping
    // textureSelected.wrapT = THREE.MirroredRepeatWrapping

   
    return (
        <>
            <Model textureSelected={textureSelected} scaleValue={scaleValue}/>

            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
        </>
    )
}

export default Scene
