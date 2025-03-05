import React, { useEffect, useState } from 'react'
import { useGun } from 'api/GunContext'

export default function DataBrowser({setSelection}) {
  const gun = useGun()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!gun) return
    
    const nodeRef = gun.get('myData')
    nodeRef.on((nodeData) => {
      setData(nodeData)
    })

    return () => {
      nodeRef.off()
    }
  }, [gun])

  const handleSelect = (key, value) => {
    const path = value && typeof value === 'object' && '#' in value
      ? value['#']
      : `myData/${key}`
    
    setSelection(path)
  }

  const renderData = () => {
    const items = Object.entries(data).filter(([key]) => key !== '_')
    return items.map(([key, value]) => (
      <div 
        key={key}
        onClick={() => handleSelect(key, value)}
        style={{ cursor: 'pointer', padding: '4px' }}
      >
        {key}: {typeof value === 'object' ? '{ ... }' : JSON.stringify(value)}
      </div>
    ))
  }

  return (
    <div>
      <h3>Data Browser</h3>
      <div>{renderData()}</div>
    </div>
  )
}