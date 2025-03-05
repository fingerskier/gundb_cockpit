import React, { useEffect, useState } from 'react'
import { useGun } from 'api/GunContext'


export default function DataBrowser() {
  const gun = useGun()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!gun) return;
    
    // Subscribe to changes under the "myData" node
    const nodeRef = gun.get('myData');
    
    // The .on listener will be called whenever data changes
    nodeRef.on((nodeData) => {
      // Gun sometimes includes metadata fields (_/etc). We can filter them out if we want.
      setData(nodeData);
    });

    // Cleanup subscription if the component unmounts
    return () => {
      nodeRef.off();
    };
  }, [gun]);

  return (
    <div>
      <h3>Data Browser</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}