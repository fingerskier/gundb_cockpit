import React, { useState } from 'react'
import { useGun } from 'api/GunContext'
import JSONItem from './JSONItem'


export default function DataEditor() {
  const gun = useGun();
  const [keyName, setKeyName] = useState('');
  const [value, setValue] = useState({});
  
  const handleSave = (e) => {
    e.preventDefault();
    if (!keyName || !value) return;
    
    // Put merges the data into the node
    gun.get('myData').put({ [keyName]: value });
    
    // Clear out the fields
    setKeyName('');
    setValue('');
  }
  
  
  return (
    <div>
      <h3>Data Editor</h3>
      <form onSubmit={handleSave}>
        <div>
          <label htmlFor="keyName">Key:</label>
          <input
            id="keyName"
            type="text"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="value">Value:</label>
          <JSONItem
            id="value"
            type="text"
            data={value}
            setData={newValue => setValue(newValue)}
          />
        </div>
        <button disabled={!keyName || !value} type="submit">Save to Gun</button>
      </form>
    </div>
  );
}