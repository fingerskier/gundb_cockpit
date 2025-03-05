import {useEffect, useState} from 'react'

const TYPE = {
  ARRAY: 'array',
  OBJECT: 'object',
  NUMBER: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
  GENERIC: 'generic',
}


export default function GenericItem({data, setData}) {
  const [type, setType] = useState()
  
  
  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setType(TYPE.ARRAY)
      } else if (typeof data === TYPE.OBJECT) {
        setType(TYPE.OBJECT)
      } else if (typeof data === TYPE.NUMBER) {
        setType(TYPE.NUMBER)
      } else if (typeof data === TYPE.STRING) {
        setType(TYPE.STRING)
      }
    }
  }, [data])
  
  
  return <>
    {(type === TYPE.ARRAY)?
      <ArrayItem data={data} setData={setData} />
    : (type === TYPE.OBJECT)?
      <ObjectItem data={data} setData={setData} />
    : (type === TYPE.NUMBER)?
      <NumericItem data={data} setData={setData} />
    : (type === TYPE.STRING)?
      <StringItem data={data} setData={setData} />
    : null
    }
  </>
}


function ArrayItem({data, setData}) {
  return <>
    [
    <ul>
      {data?.map((item, index) => 
        <li key={index}>
          <GenericItem
            data={item}
            setData={value => {
              const copy = [...data]
              copy[index] = value
              setData(copy)
            }}
          />
        </li>
      )}
      
      <li>
        <select
          onChange={e => {
            const value = e.target.value
            if (!value) return
            
            const defVal = (value === TYPE.ARRAY) ? [] 
              : (value === TYPE.OBJECT) ? {} 
              : (value === TYPE.STRING)? 'STRING'
              : (value === TYPE.NUMBER)? 1
              : value
            
            setData([...data, defVal])
            
            e.target.value = ''
          }}
        >
          <option value="">Add an Item</option>
          <option>{TYPE.ARRAY}</option>
          <option>{TYPE.OBJECT}</option>
          <option>{TYPE.NUMBER}</option>
          <option>{TYPE.STRING}</option>
        </select>
      </li>
    </ul>
    ]
  </>
}


function NumericItem({data, setData}) {
  return <>
    <input 
      type="number"
      value={data}
      onChange={e => setData(Number(e.target.value))}
    />
  </>
}


function ObjectItem({data, setData}) {
  function ObjectKey({name, setName}) {
    const [value, setValue] = useState(name)
    
    return <input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={e => setName(value)}
    />
  }
  
  
  return <>
    {'{'}
    <ul>
      {Object.keys(data).map(key => 
        <li key={key}>
          <label>
            <ObjectKey name={key} setName={newKey => {
              const copy = {...data}
              copy[newKey] = copy[key]
              setData(copy)
              delete copy[key]
            }} />
            
            :&nbsp;
            
            <GenericItem
              data={data[key]}
              setData={value => setData({...data, [key]: value})}
              />
          </label>
        </li>
      )}
      
      <li>
        <select
          onChange={e => {
            const key = e.target.value
            if (!key) return
            
            const defVal = key === TYPE.ARRAY ? [] :
              key === TYPE.OBJECT ? {} :
              key === TYPE.NUMBER ? 1 :
              key === TYPE.STRING ? 'string'
              : null
            
            setData({...data, [key]: defVal})
            
            e.target.value = ''
          }}
          >
          <option value="">Add an Item</option>
          <option>{TYPE.ARRAY}</option>
          <option>{TYPE.OBJECT}</option>
          <option>{TYPE.NUMBER}</option>
          <option>{TYPE.STRING}</option>
        </select>
      </li>
    </ul>
    {'}'}
  </>
}


function StringItem({data, setData}) {
  return <>
    <input
      type="text"
      value={data}
      onChange={e => setData(e.target.value)}
    />
  </>
}