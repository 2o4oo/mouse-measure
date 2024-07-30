import { useEffect, useState, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

function App() {
  const { nodes, materials } = useGLTF("/measuring_tape.glb");
  const [length, setLength] = useState(0);

  setInterval(() => {
    setLength(length + 1);
  }, 1500);

  return (
    <>
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
          background: '#dfdfdf'
        }}
      >
        <CameraControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 0.5}
        />
        <pointLight
          position={[3, 3, 3]}
          intensity={32}
          color="#FFF"
        />

        {/* tape ruler */}
        <mesh
          geometry={nodes.measuring_tape_01.geometry}
          material={materials.measuring_tape_01}
          position={[2, 0, 0]}
          rotation={[Math.PI / 8, 11.8, 0]}
          scale={16}
        >
          <meshBasicMaterial
            color="#007777"
          />
        </mesh>

        {/* test */}
        <mesh
          position={[5, 0, 0]}
        >
          <boxGeometry attach="geometry" args={[1, 0.005, length]} /> 
          <meshStandardMaterial attach="material" color="yellow" />
        </mesh>

      </Canvas>
    </>
  )
}

export default App;