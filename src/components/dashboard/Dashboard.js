import { Html } from "@react-three/drei";
import EquipmentStatus from "./EquipmentStatus";
import BessStatus from "./BessStatus";
import GridStatus from "./GridStatus";
// import WeatherStatus from "./WeatherStatus";

export function Dashboard({ isAnimating, onToggleAnimation, onStartTour, onQuickMove, onReturnToMap }) {
  return (
    <>
      <Html
        style={{
          position: "fixed",
          right: "20px",
          pointerEvents: "none",
        }}
        fullscreen
      >
        <button
          onClick={onToggleAnimation}
          style={{
            padding: "8px 16px",
            background: isAnimating ? "#ff4444" : "#44ff44",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          {isAnimating ? "Stop Sun" : "Start Sun"}
        </button>
        <button
          onClick={onStartTour}
          style={{
            padding: "8px 16px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
            marginLeft: "10px"
          }}
        >
          Start Tour
        </button>
        <button
          onClick={onQuickMove}
          style={{
            padding: "8px 16px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
            marginLeft: "10px"
          }}
        >
          Overview
        </button>
        <button
          onClick={onReturnToMap}
          style={{
            padding: "8px 16px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            pointerEvents: "auto",
            marginLeft: "10px"
          }}
        >
          Back to Map
        </button>
        {/* <WeatherStatus /> */}
        <EquipmentStatus />
        <BessStatus />
        <GridStatus />
      </Html>
    </>
  );
}
