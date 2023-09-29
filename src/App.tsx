import React, { createContext, useEffect, useState } from "react"
import "./App.css"
import FloatingMenu from "./fancy-components/Floating-Menu"
import MenuToggle from "./fancy-components/MenuToggle"
import data from "./data/data.json"
import TreeViewRoot from "./TreeView/TreeView"

export const TreeStackContext = createContext<TreeStackHookType>({})

type TreeStackHookType = {treeStack: {[key:string | number]:any}, pushTreeStack : (n:any)=>void }

function useTreeStack():TreeStackHookType{
  const [ts, setTs]= useState({})
  function pushTreeStack(n:any){
    setTs({...ts, [n.level] : n})
  }
  return {treeStack:ts, pushTreeStack}
}

function App() {
  const {treeStack, pushTreeStack} = useTreeStack()
  return (
    <TreeStackContext.Provider value={{treeStack, pushTreeStack}}>
    <div className="App">
      <MenuToggle>
        <FloatingMenu className="EffectZone" showFancyLabel>
          <TreeViewRoot data={data} />
        </FloatingMenu>
      </MenuToggle>
    </div>
    </TreeStackContext.Provider>
  )
}

export default App
