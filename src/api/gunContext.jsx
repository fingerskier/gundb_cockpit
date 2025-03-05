import React, { createContext, useContext, useMemo } from 'react'
import Gun from 'gun'


const GunContext = createContext(null)


export const GunProvider = ({ children }) => {
  // Initialize Gun once
  const gun = useMemo(() => {
    return Gun({
      peers: [],
    })
  }, [])

  return (
    <GunContext.Provider value={gun}>
      {children}
    </GunContext.Provider>
  )
}


export const useGun = () => {
  return useContext(GunContext)
}