import { useEffect, useRef, useState } from 'react'
import './App.css'
import DataElement from './com/DataElement'
import Help from './com/Help'
import { GunProvider } from './api/gunContext'


export default function App() {
  const inputRef = useRef(null)
  
  const [rootPath, setRootPath] = useState(null)
  const [showHelp, setShowHelp] = useState(false)
  
  
  return <>
    <h1>GunDB Cockpit</h1>
    
    <input autoFocus
      placeholder="Root Path"
      ref={inputRef}
      type="text"
    />
    
    <button onClick={() => setRootPath(inputRef.current.value)}>Set Root Path</button>
    
    <GunProvider>
      <DataElement path={rootPath} />
    </GunProvider>

    <button id="help-button"
      onClick={() => setShowHelp(!showHelp)}
    >
      {showHelp ? 'X' : '?'}
    </button>

    {showHelp && <Help />}
  </>
}