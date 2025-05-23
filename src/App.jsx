import './App.css'
import { useEffect, useState } from 'react'
import DataBrowser from './com/DataBrowser'
import DataEditor from './com/DataEditor'
import Help from './com/Help'
import { GunProvider, useGun } from './api/gunContext'
import { getNode } from 'api/gunHelpers'

function AppBody({ peers, setPeers, rootPath, setRootPath }) {
  const gun = useGun()

  const [selection, setSelection] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    if (!gun || !selection) {
      setSelectedData(null)
      return
    }

    const node = getNode(gun, selection)
    node.on(setSelectedData)
    return () => node.off()
  }, [gun, selection])

  return (
    <>
      <h1>GunDB Cockpit</h1>

      <input
        placeholder="Gun peer URL"
        value={peers}
        onChange={(e) => setPeers(e.target.value)}
        type="text"
      />

      <input
        placeholder="Root Path"
        onChange={(e) => setRootPath(e.target.value)}
        type="text"
        value={rootPath}
      />

      <DataBrowser path={rootPath} setSelection={setSelection} />
      <DataEditor data={selectedData || {}} path={selection} basePath={rootPath} />

      <button id="help-button" onClick={() => setShowHelp(!showHelp)}>
        {showHelp ? 'X' : '?'}
      </button>

      {showHelp && <Help />}
    </>
  )
}

export default function App() {
  const [peers, setPeers] = useState('')
  const [rootPath, setRootPath] = useState('data')

  return (
    <GunProvider peers={peers ? peers.split(',') : []}>
      <AppBody
        peers={peers}
        setPeers={setPeers}
        rootPath={rootPath}
        setRootPath={setRootPath}
      />
    </GunProvider>
  )
}
