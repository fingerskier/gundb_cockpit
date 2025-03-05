import { useState } from 'react'
import './App.css'
import DataBrowser from './com/DataBrowser'
import DataEditor from './com/DataEditor'


export default function App() {
  const [count, setCount] = useState(0)
  
  
  return <>
    <h1>GunDB Cockpit</h1>
    <DataBrowser />
    <DataEditor />
  </>
}