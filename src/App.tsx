import React, { useEffect, useState } from "react"
import "./App.css"
import FloatingMenu from "./fancy-components/Floating-Menu"
import MenuToggle from "./fancy-components/MenuToggle"

function App() {
  return (
    <div className="App">
      <MenuToggle>
        <FloatingMenu className="EffectZone" showFancyLabel>
          <ul>
            <li>users</li>
            <li>documents</li>
            <li>groups</li>
            <li>about</li>
          </ul>
        </FloatingMenu>
      </MenuToggle>
    </div>
  )
}

export default App
