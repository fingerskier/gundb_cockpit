import React, { useEffect, useState } from 'react'
import { useGun } from 'api/gunContext'
import { getNode } from 'api/gunHelpers'

export default function DataBrowser({ setSelection, path = 'data' }) {
  const gun = useGun()
  const [data, setData] = useState({})
  const [expanded, setExpanded] = useState({})

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

  const toggle = (keyPath) => {
    setExpanded((prev) => ({ ...prev, [keyPath]: !prev[keyPath] }))
  }

  const handleSelect = (fullPath, value) => {
    const nextPath =
      value && typeof value === 'object' && '#' in value ? value['#'] : fullPath

    setSelection(nextPath)
  }

  const renderData = (obj, currentPath) => {
    return Object.entries(obj)
      .filter(([key]) => key !== '_')
      .map(([key, value]) => {
        const keyPath = `${currentPath}/${key}`
        const isObject = typeof value === 'object' && value !== null
        const isExpanded = expanded[keyPath]
        return (
          <div key={keyPath} style={{ marginLeft: '8px' }}>
            <div
              onClick={() =>
                isObject ? toggle(keyPath) : handleSelect(keyPath, value)
              }
              style={{ cursor: 'pointer' }}
            >
              {key}: {isObject ? (isExpanded ? '▼' : '▶') : JSON.stringify(value)}
            </div>
            {isObject && isExpanded && renderData(value, keyPath)}
          </div>
        )
      })
  }

  return (
    <div>
      <h3>Data Browser</h3>
      <div>{renderData(data, path)}</div>
    </div>
  )
}