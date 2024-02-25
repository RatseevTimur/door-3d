import React, { useState } from 'react'

const EditSinkLayer = (props) => {
    let scale = 100
    let boxSize = props.boxSize
    const [hovered, setHover] = useState(false)

    function removeCut(cut) {
        props.setBoxSize({
            ...boxSize, cuts: boxSize.cuts.filter((item, i) => i !== cut)
        })
    }

    function editCut(cut) {
        // тут будет фнукция изменения положения и размера отверстия
    }

    return (
        <>
            {props.boxSize.cuts.map((cut, i) => {

                return (
                    <mesh key={i}
                        rotation={
                            cut.forma === "square" ? [0, 0, cut.rotation[2]] : [Math.PI / 2, 0, 0]
                        }
                        position={[cut.position[0], cut.position[1], 0]}
                        // onPointerDown={()=> props.removeCut(i)}
                        // onDoubleClick={()=> props.removeCut(i)}
                        onContextMenu={() => removeCut(i)}
                        onPointerOver={(event) => setHover(i)}
                        onPointerOut={(event) => setHover(false)}
                    >
                        {cut.forma === "square" ?
                            <boxGeometry args={[cut.width / scale, cut.height / scale, boxSize.thickness / scale]} />
                            :
                            <cylinderGeometry args={[cut.width / 2 / scale, cut.width / 2 / scale, boxSize.thickness / scale]} />
                        }
                        
                        <meshPhongMaterial color={hovered === i ? 'red' : '#fff'} transparent={true} opacity={hovered !== i ? 0 : .6} />
                    </mesh>
                )

            })
            }
        </>
    )

}

export default EditSinkLayer
