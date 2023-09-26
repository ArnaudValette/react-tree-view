import React, { useEffect, useState } from "react"
import "./App.css"
import FloatingMenu from "./fancy-components/Floating-Menu"
import MenuToggle from "./fancy-components/MenuToggle"
import data from "./data/data.json"
import TreeViewRoot from "./TreeView/TreeView"

function App() {
  return (
    <div className="App">
      <MenuToggle>
        <FloatingMenu className="EffectZone" showFancyLabel>
          <TreeViewRoot data={data} />
        </FloatingMenu>
      </MenuToggle>
    </div>
  )
}

export default App
