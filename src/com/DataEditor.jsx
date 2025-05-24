import React, { useEffect, useState } from 'react'
import { useGun } from 'api/gunContext'
import { getNode } from 'api/gunHelpers'
import JSONItem from './JSONItem'


export default function DataEditor({ data, path, basePath = 'data' }) {
  const gun = useGun()
  const [keyName, setKeyName] = useState('')
  const [value, setValue] = useState({})
  
  const handleSave = (e) => {
    e.preventDefault()
    const target = path ? getNode(gun, path) : getNode(gun, basePath)
    if (path) {
      target.put(value)
    } else {
      if (!keyName || value === undefined) return
      target.put({ [keyName]: value })
      setKeyName('')
    }
    setValue('')
  }
  
  
  useEffect(() => {
    const newValue = data
    delete newValue['#']
    delete newValue['_']
    setValue(newValue)
  }, [data])
  
  
  return (
    <div>
      <h3>Data Editor</h3>
      <form onSubmit={handleSave}>
        {path? <>Key: {path}</>: <div>
          <label htmlFor="keyName">Key:</label>
          <input
            id="keyName"
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
        </div>}
        
        <div>
          <label htmlFor="value">Value:</label>
          <JSONItem
            id="value"
            type="text"
            data={value}
            setData={newValue => setValue(newValue)}
          />
        </div>
        <button disabled={!path && (!keyName || !value)} type="submit">Save to Gun</button>
      </form>
      
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}