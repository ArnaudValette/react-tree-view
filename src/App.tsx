import React, { useEffect, useState } from "react"
import "./App.css"
import FloatingMenu from "./fancy-components/Floating-Menu"
import MenuToggle from "./fancy-components/MenuToggle"
import TreeView from "./TreeView/TreeView"
import data from "./data/data.json"

function App() {
  return (
    <div className="App">
      <MenuToggle>
        <FloatingMenu className="EffectZone" showFancyLabel>
          <TreeView data={data} />
        </FloatingMenu>
      </MenuToggle>
    </div>
  )
}

export default App
