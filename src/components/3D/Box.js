import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import { NavLink, useNavigate, useParams, useLocation, BrowserRouter } from "react-router-dom";
import {
    Edges, Stage, Extrude, Decal, RandomizedLight,
    SoftShadows, Float, CameraControls, Sky, PerformanceMonitor,
    useGLTF, useTexture, PivotControls, AccumulativeShadows,
    GizmoHelper, GizmoViewport, OrbitControls, Html,
} from "@react-three/drei"
import { Canvas, useFrame, useLoader, useResource } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three"
import { Geometry, Base, Subtraction, Addition, Brush } from '@react-three/csg'
import Model from './model.js'
import Sink from './Sink.js'
import EditSinkLayer from './EditSinkLayer.js'

import { useSelector, useDispatch } from 'react-redux'
import { setModelProperties, set_Prop_Box_forma } from "../../redux/reducers/model-properties.js";
import { DoubleSide } from "three";

import "./3D.scss"

const Scene = ({ forma, mesh }) => {
    let scale = 100
    let dispatch = useDispatch()
    const location = useLocation()
    let textureSelected = useSelector((state) => state.textureSelected)
    let prop_Box_forma = useSelector((state) => state.modelProperties.prop_Box_forma)
    const { visible, colorBackground } = useSelector((state) => state.scene)
    const [boxSize, setBoxSize] = useState(prop_Box_forma);

    useEffect(() => {
        if (!location.pathname.includes('/save')) {
            dispatch(set_Prop_Box_forma(boxSize))
            dispatch(setModelProperties(boxSize))
        }
    }, [boxSize])

    const textureMap = useLoader(TextureLoader, textureSelected.url)
    const texturePlaneMap = useLoader(TextureLoader, `${process.env.PUBLIC_URL}/textures/tile_texture3062.jpeg`)
    textureMap.wrapS = THREE.RepeatWrapping
    textureMap.wrapT = THREE.MirroredRepeatWrapping
   

    function NewBox(props) {

        // var matrix = new THREE.Matrix4();
        // matrix.multiply(new THREE.Matrix4().makeTranslation(0, 0, 850));
        // matrix.multiply(new THREE.Matrix4().makeRotationZ(Math.PI / 2));

        return (
            <mesh
                ref={mesh}
                castShadow receiveShadow {...props}
                matrixAutoUpdate={true}
                castShadow
            //onPointerDown={console.log}
            //onPointerMove={(e) => console.log('move')}
            >
                <Geometry>
                    <Base /*rotation={[ 0, Math.PI / 2, 0]} position={[-0.35, 0.4, 0.4]} */>
                        <boxGeometry attach="geometry" args={[boxSize.widthAll / 100, boxSize.heightAll / 100, boxSize.thickness / 100]} />
                    </Base>

                    {/* <Subtraction rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                        <cylinderGeometry args={[1, 1, 1, 66, 32]} />
                    </Subtraction> */}

                    <Subtraction rotation={[0, 0, 0]} position={[0, 0, 0]}>
                        <cylinderGeometry args={[0, 0, 0, 3, 3]} />
                    </Subtraction>

                    {boxSize.cuts.map((cut, i) => {
                        if (cut.forma === "square") return (
                            <Subtraction key={i} rotation={[0, 0, cut.rotation[2]]} position={[cut.position[0], cut.position[1], 0]}>
                                <boxGeometry args={[cut.width / scale, cut.height / scale, 1]} />
                            </Subtraction>
                        )
                        else return (
                            <Subtraction key={i} rotation={[Math.PI / 2, 0, 0]} position={[cut.position[0], cut.position[1], 0]}>
                                <cylinderGeometry args={[cut.width / 2 / scale, cut.width / 2 / scale, 1]} />
                            </Subtraction>
                        )
                    })}

                </Geometry>
                {/* <ChamfersModels boxSize={boxSize} textureMap={textureMap} setBoxSize={setBoxSize} /> */}
                <meshPhongMaterial
                    map={textureMap} shininess={100} bumpMap={textureMap} bumpScale={0.01} transparent={false} attach="material-0"
                    // opacity={1} color={'lightgray'} 
                    color={0x999999}
                />

                <Sink setBoxSize={setBoxSize} boxSize={boxSize} />

                {/* <meshStandardMaterial attach="material-1" color="#2A8AFF" /> */}
            </mesh>
        )
    }

    return (
        <>
        {textureSelected && 
        <>
            
            {visible &&
                <>
                    <Html transform /*occlude*/ zIndexRange={1}
                        position={[-boxSize.widthAll / 200 - 2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <div className="p-inputgroup">
                            {!location.pathname.includes('/save') ?
                                <>
                                    <span className="p-inputgroup-addon">mm</span>
                                    <input value={boxSize.heightAll} placeholder="size, mm" style={{ width: "100px" }}
                                        step={4} min={50} type='number'
                                        onChange={(e) => setBoxSize({ ...boxSize, heightAll: +e.target.value })} />
                                </>
                                : <span className="p-inputgroup-addon">{boxSize.heightAll}</span>
                            }

                        </div>
                        {/* <div className="cls"></div> */}
                    </Html>

                    <Html transform /*occlude*/ zIndexRange={1}
                        position={[0, boxSize.heightAll / 200 + 2.5, 0]}>
                        <div className="p-inputgroup">
                            {!location.pathname.includes('/save') ?
                                <>
                                    <span className="p-inputgroup-addon">mm</span>
                                    <input value={boxSize.widthAll} placeholder="size, mm" style={{ width: "100px" }}
                                        step={4} min={50} type='number'
                                        onChange={(e) => setBoxSize({ ...boxSize, widthAll: +e.target.value })} />
                                </>
                                : <span className="p-inputgroup-addon">{boxSize.widthAll}</span>
                            }

                        </div>
                        {/* <DragButton boxSize={boxSize} setBoxSize={setBoxSize} /> */}
                    </Html>

                </>
            }
            
            <Sky />
            <NewBox instanceMatrix={true} needsUpdate={true} />
            <Model/>
            <EditSinkLayer boxSize={boxSize} setBoxSize={setBoxSize} />

            <mesh position={[0,-11, 0]} rotation={[Math.PI / 2, 0, 0]} 
                scale={[100, 100, 1]} receiveShadow>
                <planeBufferGeometry />
                <meshPhongMaterial color="gray" map={texturePlaneMap} side={DoubleSide} />
            </mesh>

            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
            
        </>
        }
        </>
    )
}

export default Scene
