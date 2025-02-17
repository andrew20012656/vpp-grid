import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import RegionalStats from "./dashboard/RegionalStats";
import { Canvas } from "@react-three/fiber";
import Substation from "../Substation";

const MapChart = () => {
  const [selectedGeo, setSelectedGeo] = useState(null);
  const [showPowerPlant, setShowPowerPlant] = useState(false);

  const handleGeographyClick = (geo) => {
    if (geo.rsmKey === selectedGeo) {
      setSelectedGeo(null);
      setShowPowerPlant(false);
    } else {
      setSelectedGeo(geo.rsmKey);
      setShowPowerPlant(false);
    }
  };

  if (showPowerPlant) {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          camera={{
            fov: 45,
            near: 1,
            far: 1500,
            position: [-300, 150, 0]
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Substation onReturnToMap={() => setShowPowerPlant(false)} />
        </Canvas>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      {/* Left panel */}
      {selectedGeo && (
        <div style={{ flex: "0 0 300px", padding: "10px" }}>
          <RegionalStats regionId={selectedGeo} />
          <button onClick={() => setShowPowerPlant(true)}>
            View Power Plant Details
          </button>
        </div>
      )}
      {/* Right panel: map */}
      <div style={{ flex: 1 }}>
        <ComposableMap
          projectionConfig={{
            scale: 4200,
            center: [104, 9.5]
          }}
          style={{
            width: "100%",
            height: "auto"
          }}
        >
          <ZoomableGroup>
            <Geographies geography={"/test_map.json"}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography 
                    key={geo.rsmKey} 
                    geography={geo} 
                    fill={selectedGeo === geo.rsmKey ? "#F53" : "#EAEAEC"}
                    stroke="#000000"
                    onClick={() => handleGeographyClick(geo)}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#F53", outline: "none", cursor: "pointer" },
                      pressed: { fill: "#E42", outline: "none" }
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default MapChart;
