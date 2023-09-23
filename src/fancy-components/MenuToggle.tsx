import { PropsWithChildren, useState } from "react"
import "./MenuToggle.css"
import FloatingMenu from "./Floating-Menu"

enum ToggleStates {
  off = 0,
  load,
  on,
}

function MenuToggle(props: PropsWithChildren & { className?: string }) {
  const [toggle, setToggle] = useState<ToggleStates>(0)
  function trig() {
    setToggle(2)
  }
  return toggle !== 2 ? (
    <FloatingMenu
      trigger={trig}
      className={
        toggle === 0
          ? "default-menu-toggle"
          : "default-menu-toggle default-menu-toggle-animation"
      }
    >
      <div onClick={() => setToggle(1)}>+</div>
    </FloatingMenu>
  ) : (
    <>{props.children}</>
  )
}

export default MenuToggle
