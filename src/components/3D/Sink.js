import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { useTexture, PivotControls, Decal, Html, Text, Grid, Line } from "@react-three/drei"
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
// import { useControls } from 'leva'
import * as THREE from "three"

import { useSelector, useDispatch } from 'react-redux'
import { setVisibleSink } from "../../redux/reducers/scene.js";
import { inPoly } from './inPoly.js'

import "./3D.scss"
import { Button } from 'primereact/button'

const Sink = (props) => {
    let scal = 100 // значение масштабирования
    const { visibleSink, sinkState } = useSelector((state) => state.scene)
    const dispatch = useDispatch()
    const [pos, setXYZ] = useState([0, 0, props.boxSize.thickness / scal])

    const [rot, setRot] = useState([0, 0, 0])
    const [colorDecal, setColorDecal] = useState('rgb(236, 108, 108)')    

    function cutSink() {
        props.setBoxSize({
            ...props.boxSize, cuts:

                [...props.boxSize.cuts, {
                    forma: sinkState.forma, width: sinkState.width, height: sinkState.height,
                    position: pos, rotation: rot
                }]

        })
        // props.cuts.push({ sinkSize: scale, position: positionSink } )
        dispatch(setVisibleSink())
    }
    

    //вычесление расстояния от края до отверстия
    //без учета поворотов (для прямоугольных отверстий)
    function sizeToEnd() {
        // Расстояния от края до центра по "х" и "у"
        let endToCenterX = Math.round(pos[0] * scal - -props.boxSize.widthAll / 2)
        let endToCenterY = Math.round(props.boxSize.heightAll / 2 - pos[1] * scal)
        // Расстояния от края до кпая отверстия по "х" и "у"
        // без учета повроротов для прямоугольных отверстий
        let endToEndX = Math.round(pos[0] * scal - -props.boxSize.widthAll / 2 - 100)
        let endToEndY = Math.round(props.boxSize.heightAll / 2 - pos[1] * scal - 150)
        return {
            endToCenterX: endToCenterX, // от края до центра по Х
            endToCenterY: endToCenterY, // от края до центра по Y
            endToEndX: endToEndX, // от края до края по Х
            endToEndY: endToEndY // от края до края по Y
        }
    }

    // Функция изменение координат отвертсия при перетягивании мышью
    function dragSink(position) {
        // Ограничим движение отверстия границами габаритов модели
        let x_axisLimits = Math.abs(position.x) + sinkState.width/200 < Math.abs(props.boxSize.widthAll/200)
        let y_axisLimits = Math.abs(position.y) + (sinkState.height || sinkState.width)/200< Math.abs(props.boxSize.heightAll/200)
        // Зададим изначальное положение отверстия для разных форм
        let defPointCorrection = 0

        if(props.boxSize.forma === 3){ // ограничение координат для П-образной формы
            defPointCorrection = (props.boxSize.widthAll-props.boxSize.widthRight)/2/scal
            // Изменить цвет декаля 
            // if( inPoly(position, {width: sinkState.width, height: sinkState.height}, props.boxSize, scal) ) setColorDecal('yellow')
            // else setColorDecal('rgb(236, 108, 108)')
            // Сдвинуть Декаль или ограниить движение
            if( inPoly(position, {width: sinkState.width, height: sinkState.height}, props.boxSize, scal) ){
                setXYZ(
                    [
                        position.x+defPointCorrection, 
                        position.y, 
                        props.boxSize.thickness / scal / 2 + 0.01
                    ]
                )
            }
           
        }else if(props.boxSize.forma === 2){ // ограничение координат для Г-образной формы
            defPointCorrection = -(props.boxSize.widthAll-props.boxSize.widthVertical)/2/scal

            if( inPoly(position, {width: sinkState.width, height: sinkState.height}, props.boxSize, scal) ){

                setXYZ(
                    [
                        position.x+defPointCorrection, 
                        position.y, 
                        props.boxSize.thickness / scal / 2 + 0.01
                    ]
                )

            }
           
        }else{ // ограничение координат для простой формы
            defPointCorrection = 0
            x_axisLimits = Math.abs(position.x) + sinkState.width/200 < Math.abs(props.boxSize.widthAll/200)
            y_axisLimits = Math.abs(position.y) + (sinkState.height || sinkState.width)/200< Math.abs(props.boxSize.heightAll/200)

            setXYZ(
                [
                    x_axisLimits ? position.x+defPointCorrection : pos[0], 
                    y_axisLimits ? position.y : pos[1], 
                    props.boxSize.thickness / scal / 2 + 0.01
                ]
            )
        }
    }

    let shemaCircle = `${process.env.PUBLIC_URL}/icons/circle.svg`
    let shemaDecal = useTexture(shemaCircle)
    
    if (visibleSink) return (
        <>
            <group position={[ 0, 0, 0.25]}>
                <PivotControls
                    scale={0.88}
                    activeAxes={[true, true, false]} //
                    // onClick={() => { console.log("positionSink!!!", positionSink) }}
                    onDrag={(local) => {
                        const position = new THREE.Vector3()
                        // console.log(position)
                        // setPositionSink(position)
                        const scale = new THREE.Vector3()
                        const quaternion = new THREE.Quaternion()
                        local.decompose(position, quaternion, scale)
                        const rotation = new THREE.Euler().setFromQuaternion(quaternion)
                        dragSink(position)
                        // console.log(position.x)
                        setRot([rotation.x, rotation.y, rotation.z])
                    }}
                    onDragEnd={() => {
                        // console.log(pos, rot)
                    }}
                />
            </group>


            <Decal //debug={debug} часть панели инструментов
                position={pos} rotation={rot}
                // scale={2 * scale}
                scale={sinkState.forma == "square" ?
                    [sinkState.width / 100, sinkState.height / 100, 1]
                    :
                    [sinkState.width / 100, sinkState.width / 100, 1]
                }
                // map={useTexture(urlPlita)}
                color={colorDecal} //opacity={0.2}
            >
                {sinkState.forma !== "square" &&
                    <meshPhysicalMaterial
                        transparent
                        polygonOffset
                        polygonOffsetFactor={-10}
                        map={shemaDecal}
                        mapflipY={false}
                        mapanisotropy={16}
                        iridescence={1}
                        iridescenceIOR={1}
                        iridescenceThicknessRange={[0, 1400]}
                        roughness={1}
                        clearcoat={0.5}
                        metalness={0.75}
                        toneMapped={false}
                    />
                }
            </Decal>    

            <Html transform zIndexRange={1} position={[pos[0] + 1.5, pos[1] - 1, props.boxSize.thickness / scal / 2]}>
                <Button style={styles.buttonSink} icon="pi pi-check"
                    tooltip="Вырезать"
                    // disabled={!positionSink.x}
                    onClick={() => cutSink()}
                />
            </Html>
        </>
    )
}

export default Sink

const styles = {
    buttonSink: {
        width: "25px",
        height: "15px"
    }
}
