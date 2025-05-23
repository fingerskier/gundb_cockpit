import React, { createContext, useContext, useMemo } from 'react'
import Gun from 'gun'



const GunContext = createContext(null)


export const GunProvider = ({ children, peers = [] }) => {
  const gun = useMemo(() => {
    const options = peers.length ? { peers } : {}
    window.gun = Gun(options)
    return window.gun
  }, [peers])
  
  
  return (
    <GunContext.Provider value={gun}>
      {children}
    </GunContext.Provider>
  )
}


export const useGun = () => {
  return useContext(GunContext)
}