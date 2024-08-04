import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
const modelPath = '/measuring_tape.glb';

function TapeRuler({ position = {}, length, scaleCanvasRef }) {
    const { nodes, materials } = useGLTF(modelPath);
    const tapeShape = new THREE.Shape();
    tapeShape.moveTo(0, 0);
    tapeShape.lineTo(.31, 0);
    tapeShape.lineTo(.31, .01);
    tapeShape.lineTo(0, .01);
    tapeShape.lineTo(0, 0);

    const tapeExtrudeConf = {
        depth: .15 + length,
        bevelEnabled: false,
    };

    return (
        <>
            <mesh
                geometry={nodes.measuring_tape_01.geometry}
                material={materials.measuring_tape_01}
                position={[
                    1 + (position.x || 0),
                    0 + (position.y || 0),
                    0 + (position.z || 0)
                ]}
                rotation={[Math.PI / 10, 11.9, 0]}
                scale={16}
            />

            <mesh
                position={[
                    .56 + (position.x || 0),
                    .09 + (position.y || 0),
                    .35 + (position.z || 0)
                ]}
                rotation={[Math.PI / 10, 11.9, 0]}
            >
                <extrudeGeometry
                    name="tape"
                    args={[tapeShape, tapeExtrudeConf]}
                />
                <meshBasicMaterial>
                   
                </meshBasicMaterial>
            </mesh>
        </>
    )
};

export default TapeRuler;