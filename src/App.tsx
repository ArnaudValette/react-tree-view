import React, { createContext, useEffect, useState } from "react"
import "./App.css"
import FloatingMenu from "./fancy-components/Floating-Menu"
import MenuToggle from "./fancy-components/MenuToggle"
import data from "./data/data.json"
import TreeViewRoot from "./TreeView/TreeView"
import { KeyObject } from "crypto"

export const TreeStackContext = createContext<TreeStackHookType>({
  treeStack: {},
  pushTreeStack: () => {},
})

type TreeNode = any
type WrappedNode = { [key: string | number | symbol]: TreeNode }
type TreeStackPusher = (content: WrappedNode, level: number) => void

type TreeStackHookType = {
  treeStack: WrappedNode
  pushTreeStack: TreeStackPusher
}

function useTreeStack(): TreeStackHookType {
  const [ts, setTs] = useState<WrappedNode>({})

  const pushTreeStack: TreeStackPusher = (content, level) => {
    /* const prev = ts[level as keyof typeof ts]
     * if (prev && prev.id !== id) {
     *   clearBranchWhoseRootIsAtLevel(level)
     * } */
    const newTree = clearBranchWhoseRootIsAtLevel(level)
    setTs({ ...newTree, [level]: content })
  }

  const clearBranchWhoseRootIsAtLevel = (level: number) => {
    //return Object.entries(ts).filter(([id, value]) => parseInt(id) < level)
    const e = Object.entries(ts).filter(([key, _]) => parseInt(key) < level)
    return Object.fromEntries(e)
  }
  return { treeStack: ts, pushTreeStack }
}

function App() {
  const { treeStack, pushTreeStack } = useTreeStack()
  return (
    <TreeStackContext.Provider value={{ treeStack, pushTreeStack }}>
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
