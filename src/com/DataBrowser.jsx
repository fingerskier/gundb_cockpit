import React, { useEffect, useState } from 'react'
import { useGun } from 'api/GunContext'
import { getNode } from 'api/gunHelpers'

export default function DataBrowser({ setSelection, path = 'data' }) {
  const gun = useGun()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!gun) return
    
    const nodeRef = getNode(gun, path)
    nodeRef.on((nodeData) => {
      setData(nodeData)
    })

    return () => {
      nodeRef.off()
    }
  }, [gun, path])

  const handleSelect = (key, value) => {
    const nextPath =
      value && typeof value === 'object' && '#' in value
        ? value['#']
        : `${path}/${key}`

    setSelection(nextPath)
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