import { useEffect, useRef, useState } from 'react'
import './App.css'
import DataElement from './com/GunElement'
import Help from './com/Help'
import { GunProvider, useGun } from './api/gunContext'


export default function App() {
  const gun = useGun()
  
  const [rootPath, setRootPath] = useState('data')
  const [showHelp, setShowHelp] = useState(false)
  
  
  return <>
    <h1>GunDB Cockpit</h1>
    
    <input autoFocus
      placeholder="Root Path"
      onChange={(e) => setRootPath(e.target.value)}
      type="text"
      value={rootPath}
    />
    
    
    <GunProvider>
      <DataElement node={gun.get(rootPath)} name={rootPath} />
    </GunProvider>

    <button id="help-button"
      onClick={() => setShowHelp(!showHelp)}
    >
      {showHelp ? 'X' : '?'}
    </button>

    {showHelp && <Help />}
  </>
}