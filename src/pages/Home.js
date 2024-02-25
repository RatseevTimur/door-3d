import React, { useEffect, useState, useRef, Suspense } from "react";
import TexturesList from "../components/textures/TexturesList.js"
import { Dropdown } from 'primereact/dropdown';
import Toolbar from "../components/toolbar/Toolbar.js"

import {
  SoftShadows, Float, CameraControls, OrbitControls, Sky, AccumulativeShadows, RandomizedLight,
  PerformanceMonitor, Html, Merged, GizmoHelper, GizmoViewport, useProgress
} from "@react-three/drei"
import { Canvas, useFrame, useLoader, merge, useResource } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux'
import { setFormaModel } from "../redux/reducers/model-properties.js";
import { Slider } from "primereact/slider";

// import InputGroupDemo from "../components/form/form.js"

import "./Home.scss"

const Box = React.lazy(() => import('../components/3D/Box.js'));
const GLTF = React.lazy(() => import('../components/3D/GLTF.js'));
const OBJ = React.lazy(() => import('../components/3D/OBJ.js'));

function Home() {
  const mesh = useRef()
  const [scaleValue, setScaleValue] = useState(.1);
  const { progress } = useProgress()
  const dispatch = useDispatch()
  const colorBackground = useSelector((state) => state.scene.colorBackground)
  // const { visible, colorBackground } = useSelector((state) => state.scene)
  const [forma, setForma] = useState(1);
  const formsCountertop = [
    { name: 'Примитив', value: 1 },
    { name: 'GLTF', value: 2 },
    { name: 'OBJ', value: 3 }
  ];

  // В функцию RenderForma входят все виды форм внутри каждой свой Canvas и Scene
  // В каждую форму передается переменная mesh для записи меша для возможности скачивания GLTF в одной точке
  const RenderForma = () => {
    if (forma === 3) {
      return <OBJ mesh={mesh} forma={forma} scaleValue={scaleValue} />
    }
    else if (forma === 2) {
      return <GLTF mesh={mesh} forma={forma} scaleValue={scaleValue} />
    }
    else {
      return <Box mesh={mesh} forma={forma} />
    }
  }

  const [selectedForma, setSelectedForma] = useState(formsCountertop[0]);

  const selectedFormaTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center" style={{ justifyContent: 'space-between' }}>
          <div>{option.naame}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };


  const formaOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center" style={{ justifyContent: 'space-between' }}>
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="Home">

      <div className="selects">
        <TexturesList />

        <Dropdown className="w-full md:w-14rem" //panelFooterTemplate={panelFooterTemplate}
          options={formsCountertop}
          optionLabel="value"
          placeholder="Выбор модели"
          value={selectedForma}
          onChange={(e) => {
            setSelectedForma(e.value);
            setForma(e.value);
            dispatch(setFormaModel(e.value))
          }}
          // style={{ backgroundColor: "rgba(48, 48, 48, 0.26)", backdropFilter: "blur(5px)" }}
          valueTemplate={selectedFormaTemplate} itemTemplate={formaOptionTemplate}
        />

        {forma != 1 && 
          <div className="card flex justify-content-center">
            <Slider value={scaleValue} onChange={(e) => setScaleValue(e.value)} orientation="vertical" className="h-14rem"
              step={0.01} min={0.01} max={0.2}
            />
          </div>
        }
          
      </div>

      <div className="content">

        <div className="buttons-panel"> {/* Панель иснтрументов в правом верхнем углу */}
          <Toolbar mesh={mesh}  forma={forma}/> {/* Передаем mesh in Toolbar для кнопки скачивкания файла GLTF */}
        </div>



        <div className="ddd-scena">
          <Suspense fallback={<div>Loading...</div>/*<Html center>{progress} % loaded</Html>*/}>
            {/* Единый Canvas поможет избежать утечек памяти - "THREE.WebGLRenderer: Context Lost." */}
            <div id="model">
              <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}
                camera={{ position: [-5, -2, 10] }} width={"100%"} height={"100%"}>
                <color attach="background" args={[`#${colorBackground}`]}
                />
                {/* <ambientLight intensity={1} /> */}
               
                <OrbitControls makeDefault 
                  minAzimuthAngle={-Math.PI / 4}
                  maxAzimuthAngle={Math.PI / 4}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI - Math.PI / 6}
                />
                <directionalLight castShadow position={[5, 7, 5]} intensity={5} />
                {/* <pointLight position={[5, 10, 5]} intensity={10} /> */}
                <RenderForma />{/* Компонент отрисовки основной части столешницы */}

              </Canvas>
            </div>

          </Suspense>
        </div>

      </div>
    </div>
  );
}

export default Home;