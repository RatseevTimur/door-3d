import React, { useEffect, useState } from "react";

import html2canvas from 'html2canvas';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

import { Button } from 'primereact/button';
import { ColorPicker } from 'primereact/colorpicker';

import { useSelector, useDispatch } from 'react-redux'
import { setColorBackground, setVisible } from "../../redux/reducers/scene.js";
import { Dropdown } from 'primereact/dropdown';
import DialogWindow from '../dialog/DialogWindow.jsx'
import "./Toolbar.scss"

function Toolbar({ mesh, forma }) {
    const dispatch = useDispatch()
    const { colorBackground, visible, visibleSink } = useSelector((state) => state.scene)

    const textureSelected = useSelector((state) => state.textureSelected)
    let textureLoadSingle = useSelector((state) => state.textureLoad)
    const modelProperties = useSelector((state) => state.modelProperties.modelProperties)
    const chamfer = useSelector((state) => state.modelProperties.chamfer)
    const cuts = useSelector((state) => state.modelProperties.cuts)

    let models = JSON.parse(localStorage.getItem('models')) || []

    const [visibleDialog, setVisibleDialog] = useState(false);

    const saveModel = () => {
        const modelPreview = document.getElementById("model")
        let preview
        html2canvas(modelPreview).then(function (canvas) {
            // document.body.appendChild(canvas);
            preview = canvas.toDataURL()
        })
            .then(() => {
                function getRandomInt(max) {
                    return Math.floor(Math.random() * max);
                }

                const model = {
                    id: getRandomInt(1000000000000000000000),
                    material: textureLoadSingle,
                    model: modelProperties,
                    chamfer: chamfer,
                    preview: preview,
                    cuts: cuts
                }
                console.log(model)

                models.push(model)

                localStorage.setItem('models', JSON.stringify(models))
            })
    }

    //Скачивание 3Д модели
    const params = {
        trs: false,
        onlyVisible: true,
        binary: false,
        maxTextureSize: 4096,
    };
    const options = {
        trs: params.trs,
        onlyVisible: params.onlyVisible,
        binary: params.binary,
        maxTextureSize: params.maxTextureSize
    };
    let exporter = new GLTFExporter()
    const export3D = (mesh) => {
        //если модель создана
        let filename = prompt('Введите имя файла', '')
        if (filename !== null && filename !== '') {
            //создать ссылку на файл
            let link = document.createElement('a')
            link.style.display = 'none'
            document.body.appendChild(link)
            function save(blob, filename) {
                link.href = URL.createObjectURL(blob)
                link.download = filename
                link.click()
            }

            function saveString(text, filename) {
                //   save(new Blob([text], { type: 'text/plain' }), filename);
                save(new Blob([text], { type: 'application/json' }), filename)
            }
            //let sceneToExport = window.AFRAME ? AFRAME.scenes[0].object3D : scene
            exporter.parse(mesh.current, function (gltf) {
                const output = JSON.stringify(gltf, null, 2);
                saveString(output, filename + '.gltf')
            }, options);
        }
    }
    //Скачивание 3Д модели end

    return (
        <>
            {forma == 1 &&
                <>
                    <Button className="p-button-text" icon={(options) => <img src={`${process.env.PUBLIC_URL}/logo.svg`}></img>}
                        placeholder="Bottom" tooltip="вырез для котика" tooltipOptions={{ position: 'bottom' }}
                        onClick={() => setVisibleDialog(true)}
                    />

                    <Button icon={`pi ${visible ? 'pi-eye-slash' : 'pi-eye'}`}
                        className="p-button-danger p-button-text p-button-lg"
                        placeholder="Bottom" tooltip="Скрыть инструменты" tooltipOptions={{ position: 'bottom' }}
                        onClick={() => dispatch(setVisible())}
                    />

                    <Button icon="pi pi-download" className="p-button-info p-button-text p-button-lg" onClick={() => export3D(mesh)}
                        placeholder="Bottom" tooltip="Скачать gltf" tooltipOptions={{ position: 'bottom' }}
                    />
                </>
            }

            <ColorPicker value={colorBackground} onChange={(e) => dispatch(setColorBackground(e.value))}
                tooltip="Изменить цвет фона" tooltipOptions={{ position: 'bottom' }}
            />

            <Button icon="pi pi-save" className="p-button-danger p-button-text p-button-lg" onClick={() => saveModel()}
                placeholder="Bottom" tooltip="Сохранить модель" tooltipOptions={{ position: 'bottom' }}
            />



            <DialogWindow visible={visibleDialog} setVisible={setVisibleDialog} />
        </>
    );
}

export default Toolbar;
