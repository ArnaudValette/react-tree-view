import React, { createContext, useEffect, useState } from "react"
import "./App.css"
import FloatingMenu from "./fancy-components/Floating-Menu"
import MenuToggle, { ToggleStates } from "./fancy-components/MenuToggle"
import data from "./data/data.json"
import TreeViewRoot from "./TreeView/TreeView"
import { KeyObject } from "crypto"

export const TreeStackContext = createContext<TreeStackHookType>({
  treeStack: {},
  pushTreeStack: () => {},
  popTreeStack: () => {},
})

type TreeNode = any
type WrappedNode = { [key: string | number | symbol]: TreeNode }
type TreeStackPusher = (content: WrappedNode, level: number) => void
type TreeStackPopper = (level: number) => void

type TreeStackHookType = {
  treeStack: WrappedNode
  pushTreeStack: TreeStackPusher
  popTreeStack: TreeStackPopper
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

  const popTreeStack: TreeStackPopper = (level) => {
    const newTree = clearBranchWhoseRootIsAtLevel(level)
    setTs({ ...newTree })
  }
  return { treeStack: ts, pushTreeStack, popTreeStack }
}

function App() {
  const treeStackHook = useTreeStack()
  const [toggle, setToggle] = useState<ToggleStates>(0)
  return (
    <TreeStackContext.Provider value={treeStackHook}>
      <div className="App">
        <MenuToggle state={{ toggle, setToggle }}>
          <FloatingMenu className="EffectZone" showFancyLabel>
            <TreeViewRoot data={data} state={{ toggle, setToggle }} />
          </FloatingMenu>
        </MenuToggle>
      </div>
    </TreeStackContext.Provider>
  )
}

export default App
