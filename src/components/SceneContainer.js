import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Map } from './Map'
import { Substation } from './Substation'

export const SceneContainer = () => {
  const [activeScene, setActiveScene] = useState('map')
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const handleDistrictClick = (districtId) => {
    setSelectedDistrict(districtId)
    setActiveScene('substation')
  }

  const handleBackClick = () => {
    setActiveScene('map')
    setSelectedDistrict(null)
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {activeScene === 'map' ? (
        <Canvas>
          <Map onDistrictClick={handleDistrictClick} />
        </Canvas>
      ) : (
        <>
          <button
            onClick={handleBackClick}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 1000,
              padding: '8px 16px',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Back to Map
          </button>
          <Canvas>
            <Substation districtId={selectedDistrict} />
          </Canvas>
        </>
      )}
    </div>
  )
}
