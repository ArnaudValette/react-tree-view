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
    if (toggle === 1) {
      setToggle(2)
    }
  }
  return toggle !== 2 ? (
    <div className="wrapper" onClick={() => setToggle(1)}>
      <FloatingMenu
        onAnimationEnd={trig}
        className={
          toggle === 0
            ? "default-menu-toggle"
            : "default-menu-toggle default-menu-toggle-animation"
        }
      >
        +
      </FloatingMenu>
    </div>
  ) : (
    <>{props.children}</>
  )
}

export default MenuToggle
