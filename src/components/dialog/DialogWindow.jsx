import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';

import { useSelector, useDispatch } from 'react-redux'
import { setVisibleSink, setSinkState } from "../../redux/reducers/scene.js";

import "./DialogWindow.scss"

export default function DialogWindow(props) {
    // const [visible, setVisible] = useState(false);
    const { sinkState } = useSelector((state) => state.scene)
    const dispatch = useDispatch()

    const [circleRadius, setCircleRadius] = useState(450);
    const [squareSize, setSquareSize] = useState({
        width: 524,
        height: 424
    });
    const [sinkForm, setSinkForm] = useState("square")

    function onSubmit(){
        //Запишем размеры отверстия которое будем вырезать
        if(sinkForm==="square"){
            dispatch(setSinkState({
                ...sinkState,
                forma: "square",
                width: squareSize.width,
                height: squareSize.height
            }))
        }else{
            dispatch(setSinkState({
                ...sinkState,
                forma: "circle",
                width: circleRadius,
                height: null // Для круглой формы не нужен второй параметр
            }))
        }
      
        props.setVisible(false) //закрыть модалку
        dispatch(setVisibleSink()) //отобразить компонент для отверстий
    }

    const footerContent = (
        <div>
            <Button label="Отмена" icon="pi pi-times" onClick={() => props.setVisible(false)} className="p-button-text" />
            <Button label="Добавить вырез" icon="pi pi-check" onClick={() => onSubmit()} autoFocus />
        </div>
    );

    const Shadow = () => {
        return (
            <filter id='insetShadow'>
                <feOffset dx='10' dy='10' />
                <feGaussianBlur stdDeviation='5' result='offset-blur' />
                <feComposite
                    operator='out'
                    in='SourceGraphic'
                    in2='offset-blur'
                    result='inverse'
                />
                <feFlood
                    floodColor='black'
                    floodOpacity='.5'
                    result='color'
                />
                <feComposite
                    operator='in'
                    in='color'
                    in2='inverse'
                    result='shadow'
                />
                <feComposite
                    operator='over'
                    in='shadow'
                    in2='SourceGraphic'
                />
            </filter>
        )
    }

    return (
        <div className="card flex justify-content-center">
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => props.setVisible(true)} /> */}
            <Dialog header="Добавление выреза" visible={props.visible} style={{ width: '50vw', height: "430px" }} onHide={() => props.setVisible(false)} footer={footerContent}>
                <div className="card flex flex-wrap gap-3 p-fluid"
                    style={{display: 'flex', justifyContent: 'center'}}
                >
                    <svg width="180" height="180" viewBox="0 0 180 180" onClick={() => setSinkForm("square")}
                        className={`cut-forma${sinkForm == "square" ? "-active" : ""}`}
                    >
                        <Shadow />
                        <rect x="0" y="0" rx="10" ry="10" width="180" height="180" />
                    </svg>

                    <svg width="180" height="180" viewBox="0 0 180 180" onClick={() => setSinkForm("circle")}
                        className={`cut-forma${sinkForm == "circle" ? "-active" : ""}`}
                    >
                        <Shadow />
                        <circle cx="90" cy="90" r="90" />
                    </svg>
                </div>

                <div className="card flex flex-wrap gap-3 p-fluid">
                    <div className="flex-auto">
                        {sinkForm === "square" ?
                            <>
                                <label htmlFor="square-width" className="font-bold block mb-2">Ширина</label>
                                <InputNumber inputId="square-width" value={squareSize.width} min={20} /*max={100}*/
                                    onValueChange={(e) => setSquareSize({ ...squareSize, width: e.value })} mode="decimal" showButtons />
                                <label htmlFor="square-height" className="font-bold block mb-2">Высота</label>
                                <InputNumber inputId="minmax-height" value={squareSize.height} min={20} /*max={100}*/
                                    onValueChange={(e) => setSquareSize({ ...squareSize, height: e.value })} mode="decimal" showButtons />
                            </>
                            :
                            <>
                                <label htmlFor="circle" className="font-bold block mb-2">Диаметр</label>
                                <InputNumber inputId="circle" value={circleRadius} onValueChange={(e) => setCircleRadius(e.value)} mode="decimal" showButtons min={20} /*max={100}*/ />
                            </>
                        }
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
