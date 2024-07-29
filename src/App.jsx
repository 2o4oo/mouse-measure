import { useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

function App() {
  const { nodes, materials } = useGLTF("/measuring_tape.glb");

  return (
    <>
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
          background: '#ffd800'
        }}
      >
        <CameraControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 0.5}
        />
        <pointLight
          position={[3, 3, 3]}
          intensity={0}
          color="#FFF"
        />
        <directionalLight color='#f81010' position={[0, 1, 0]} />
        <mesh
          geometry={nodes.measuring_tape_01.geometry}
          material={materials.measuring_tape_01}
          position={[2, 0, 0]}
          rotation={[Math.PI / 8, 11.8, 0]}
          scale={16}
        >
          <meshBasicMaterial
            color="rgb(110, 110, 110)"
          />
        </mesh>
      </Canvas>
    </>
  )
}

export default App;