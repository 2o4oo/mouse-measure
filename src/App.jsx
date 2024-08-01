import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

function App() {
  const { nodes, materials } = useGLTF("/measuring_tape.glb");
  let [length, setLength] = useState(0);
  const tapeShape = new THREE.Shape();
  tapeShape.moveTo(0, 0);
  tapeShape.lineTo(.3, 0);
  tapeShape.lineTo(.3, .01);
  tapeShape.lineTo(0, .01);
  tapeShape.lineTo(0, 0);

  const tapeExtrudeConf = {
    depth: length,
    bevelEnabled: false,
  };

  return (
    <>
      <main>
        <h3>Wheeler</h3>
        <p>Use your ordinary mouse as a tape ruler.</p>
        <div>
          <input
            type="range"
            min="0"
            max="50"
            step={0.1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <span>Length: {length}</span>
        </div>
      </main>
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
        <ambientLight
          position={[2, 3, 3]}
          intensity={16}
          color="#FFF"
        />

        {/* tape ruler */}
        <mesh
          geometry={nodes.measuring_tape_01.geometry}
          material={materials.measuring_tape_01}
          position={[2, 0, 0]}
          rotation={[Math.PI / 64, 12.55, 0]}
          scale={16}
        >
          <meshBasicMaterial
            color="#007777"
          />
        </mesh>

        {/* test (sliced tape) */}
        <mesh position={[1.84, 0.155, 0.65]}>
          {/* <boxGeometry attach="geometry" args={[1, 0.005, length]} /> */}
          <extrudeGeometry
            name="slicedTape"
            args={[tapeShape, tapeExtrudeConf]}
          />
          <meshStandardMaterial attach="material" color="yellow" />
        </mesh>

      </Canvas>
    </>
  )
}

export default App;