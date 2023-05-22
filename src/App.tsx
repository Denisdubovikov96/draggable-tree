import React from 'react';
import { Category } from './components/Category';
import ScaleZone from './components/ScaleZone';
import { ReactComponent as Plus } from "./icons/plus.svg"
import { ReactComponent as Minus } from "./icons/minus.svg"
import { ReactComponent as Center } from "./icons/center.svg"
import {  useNodeTree } from './hooks/useBinnaryTree';
import {  useDraggable } from './hooks/useDraggble';
import './App.css';

const options = [0.5, 0.6, 0.7, 0.7, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]

const scaleStep = 0.1

function App() {
  const { node } = useNodeTree({ name: "Root Name", slug: "0-0", nodes: {}, type: "category" })
  const [scale, setScale] = React.useState(1)

  const { ref, handleMouseDown } = useDraggable()

  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleCenter = () => {
    // @ts-ignore
    const top = containerRef.current?.clientHeight - ref.current?.clientHeight 
    // @ts-ignore
    const left = containerRef.current?.clientWidth - ref.current?.clientWidth 
    
    // @ts-ignore
    ref.current.style.top = `${top / 2}px`
    // @ts-ignore
    ref.current.style.left = `${left / 2}px`
  }

  const onScaleStep = (step:number) =>{
    const newScale = Number((scale + step).toFixed(1))
    
    if (newScale <= 1.5 && newScale >= 0.5) {      
      setScale(newScale)
    }
  }


  return (
    <div className="App">
      <header className='header'>
        <h1>
          Services
        </h1>

        <div className='controls'>
          {/* <button className='btn primary'>List view</button> */}
          <button className='btn secondary' onClick={handleCenter}>
            <Center />

          </button>

          <div className='btn-group'>
            <button className='btn secondary' onClick={() => onScaleStep(scaleStep)}>
              <Plus />
            </button>
            <select className='select' name="scale" id="scale" value={scale} onChange={e => {
              setScale(Number(e.target.value))
            }}>
              {options.map((v) => {
                return (
                  <option value={v} label={`${(v * 100).toFixed()}%`}></option>
                )
              })}
            </select>
            <button className='btn secondary' onClick={() =>onScaleStep(-scaleStep)}>
              <Minus />
            </button>
          </div>
        </div>

      </header>

      <div className='main'>


        <div ref={containerRef} className='drag-area' onMouseDown={(e) => handleMouseDown(e)}>
          <div className='draggable-element' ref={ref} >
            <ScaleZone scale={scale}>
              <Category
                isRoot
                node={node}
              // onChildEdit={onRootChildEdit(cNode)}
              // onChildRemove={onRootChildRemove(cNode)}
              />
            </ScaleZone>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
