import { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TapeRuler from '../TapeRuler';
import { IoIosWarning } from "react-icons/io";
import { IoIosInformationCircle } from "react-icons/io";
import { IoScaleSharp } from "react-icons/io5";
import './App.css';

function App() {
  // unit: milimeter
  const wheelD = 26; // diemeter
  const wheelC = Math.PI * wheelD // circumference
  const encoderFullTicks = 24;
  const distPerTick = wheelC / encoderFullTicks;
  const [length, setLength] = useState(0);

  // ruler scale image
  const rulerScale = useRef();

  useEffect(() => {
    const ctx = rulerScale.current.getContext('2d');
    ctx.rect(0, 0, 300, 100);

    ctx.font = "48px serif";
    ctx.fillText("RulerScaleCanvas", 0, 32);
  }, []);

  return (
    <>
      <main>
        <div className="indicator">
          <h2><span>Mouscale.</span></h2>
          <p className='splitsection titlemargin'>
            Turns your ordinary mouse to a tape measure.
          </p>
          <p className='notice weight5h'>
            <IoScaleSharp />
            Status
          </p>
          <p
            className='splitsection doublefontsize tabular-nums weight7h'
            style={{
              color: '#222'
            }}
          >
            {(() => {
              const cm = (length / 10).toFixed(2);
              const inch = (length / 25.4).toFixed(2);

              return `
                ${cm} cm or ${inch} Inch
              `
            })()
            }
          </p>
          <p className='notice weight5h'>
            <IoIosInformationCircle />
            How to use
          </p>
          <p className='notice'>
            Turn the mouse upside down and roll it with the wheel touching the object to be measured.
          </p>
          <p className='notice splitsection'>
            Also, you can reset measurements by right click.
          </p>
          <p className='notice weight5h'>
            <IoIosWarning />
            Notices
          </p>
          <p className='notice'>
            Scrolling fast may reduces accuracy. about 10cm/s or less would be recommended.
          </p>
        </div>
        <canvas
          ref={rulerScale}
          height={100}
          width={300}
          style={{
            zIndex: 999,
            position: 'fixed',
            top: 0
          }}
          hidden
        />
        <Canvas
          onWheel={(event) => {
            // wheel event: 
            const direction = (event.deltaY < 0) ? 1 : -1;
            console.log('wheelevent:', direction);

            if (length + (direction * distPerTick) <= 0) {
              setLength(0);
              return;
            }

            setLength(length + (direction * distPerTick));
          }}
          onAuxClick={(event) => {
            // right click: rolls the tape up.
            if (event.nativeEvent.button === 2) {
              setLength(0);
            }
          }}
          style={{
            width: '100vw',
            height: '100vh',
            background: null
          }}
        >
          <OrbitControls
            enableZoom={false}
          />
          <ambientLight
            position={[2, 3, 3]}
            intensity={2}
            color="white"
          />

          <pointLight position={[1, 1, 1]} intensity={3} />

          <TapeRuler
            position={{
              x: 1,
              y: 0,
              z: 0
            }}
            length={length / 60}
            scaleCanvasRef={rulerScale}
          />
        </Canvas>
      </main>
    </>
  )
}

export default App;