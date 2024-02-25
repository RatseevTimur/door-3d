import { MeshTransmissionMaterial } from "@react-three/drei"

export const Torus = (props) => (
    <mesh receiveShadow castShadow {...props}>
        <torusGeometry args={[4, 1.2, 128, 64]} />
        <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
    </mesh>
)

export const Knot = (props) => (
    <mesh receiveShadow castShadow {...props}>
        <torusKnotGeometry args={[3, 1, 256, 32]} />
        <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
    </mesh>
)

const App = () => (
    <>
        <Torus position={[5,5,3]}/>
        <Knot castShadow position={[-10, -5, -10]}/>
    </>
)

export default App;