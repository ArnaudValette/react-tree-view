import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import Div100vh from "./fancy-components/Div100"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Div100vh>
    <App />
  </Div100vh>
)
