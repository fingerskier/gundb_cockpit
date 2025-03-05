import { useEffect, useState } from 'react'
import './App.css'
import DataBrowser from './com/DataBrowser'
import DataEditor from './com/DataEditor'
import { useGun } from 'api/GunContext'


export default function App() {
  const [dataPath, setDataPath] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const gun = useGun()
  
  
  useEffect(() => {
    if (!gun || !dataPath) {
      setSelectedData(null)
      return
    }
    const selectedRef = gun.get(dataPath)
    selectedRef.on((data) => {
      setSelectedData(data)
    })
    
    console.log(dataPath, selectedData)
    
    return () => {
      selectedRef.off()
    }
  }, [gun, dataPath])
  
  
  return <>
    <h1>GunDB Cockpit</h1>
    <DataBrowser setSelection={setDataPath} />
    <pre>{JSON.stringify(dataPath, null, 2)}</pre>
    <DataEditor data={selectedData} path={dataPath} />
  </>
}