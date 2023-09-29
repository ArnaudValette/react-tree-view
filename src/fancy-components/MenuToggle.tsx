import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react"
import "./MenuToggle.css"
import FloatingMenu from "./Floating-Menu"

export enum ToggleStates {
  off = 0,
  load,
  on,
}

export type MenuToggleState = {
  toggle: ToggleStates
  setToggle: Dispatch<SetStateAction<ToggleStates>>
}
function MenuToggle(
  props: PropsWithChildren & {
    state: MenuToggleState
    className?: string
  }
) {
  const { toggle, setToggle } = props.state
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
