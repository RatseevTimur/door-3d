import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { useLocation } from "react-router-dom";
import { GizmoHelper, GizmoViewport, Html} from "@react-three/drei"
import { Canvas, useFrame, useLoader, useResource } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three"
import { Geometry, Base, Subtraction, Addition, Brush } from '@react-three/csg'
import Sink from './Sink.js'
import EditSinkLayer from './EditSinkLayer.js'

import { useSelector, useDispatch } from 'react-redux'
import { setModelProperties, set_Prop_Box_forma } from "../../redux/reducers/model-properties.js";

import "./3D.scss"

import { useTexture } from "@react-three/drei";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Rock = ({scaleValue}) => {
    let textureSelected = useSelector((state) => state.textureSelected)
  const obj = useLoader(OBJLoader, `${process.env.PUBLIC_URL}/door/10057_wooden_door_v3_iterations-2.obj`);
//const texture = useTexture("/door/10057_wooden_door_v1_diffuse.jpg");
  const texture = useTexture(textureSelected.url);

//   const textureMap = useLoader(TextureLoader, texture.url)
//   const geometry = useMemo(() => {
//     let g;
//     obj.traverse((c) => {
//       if (c.type === "Mesh") {
//         const _c = c as Mesh;
//         g = _c.geometry;
//       }
//     });
//     return g;
//   }, [obj]);

   const geometry = useMemo(() => {
        let g;
        // obj.traverse( function ( child ) {

        //     if ( child.isMesh ) {
    
        //         child.material.map = texture;
        //         g = child.geometry//.computeVertexNormals();
                
        //     }
    
        // } );
        obj.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
                g = child.geometry//.computeVertexNormals();
            }

            // if ( child.isMesh ) { child.castShadow = true; }
        } );
        return g;
    }, [obj]);

   

  return (
    <mesh castSwhadow geometry={geometry} scale={scaleValue} rotation={[ -1.56, 0, 0]} position={[0,-10,0]}>
      <meshPhysicalMaterial map={texture} />
    </mesh>
    // <primitive object={obj} />
    
  );
};

const Scene = ({scaleValue}) => {
    return (
        <>
            <Rock scaleValue={scaleValue}/>

            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
        </>
    )
}

export default Scene
