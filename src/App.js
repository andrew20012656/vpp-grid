import "./App.css";
import { Canvas } from "@react-three/fiber";
import Platform from "./Substation";
import Map from "./components/Map.js"

function App() {
  return (
    <Map />
    // <Canvas
    //   camera={
    //     {
    //       fov: 45,
    //       near: 1,
    //       far:1500,
    //       position: [-300,150,0]
    //     }
    //   }
    // >
    //   <Platform />
    // </Canvas>
  );
}

export default App;
