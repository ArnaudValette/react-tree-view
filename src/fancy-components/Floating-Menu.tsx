import { PropsWithChildren, useEffect, useRef, useState } from "react"
import "./Floating-Menu.css"

enum Orientations {
  Portrait = 0,
  Left,
  Right,
}

function FloatingMenu(
  props: PropsWithChildren & {
    className?: string
    showFancyLabel?: boolean
  }
) {
  const style = useFloating()
  return (
    <div style={style.s} className={props.className || ""}>
      {props.children}
    </div>
  )
}

function useFloating() {
  //const [motion, setMotion] = useState<string>(`skew(0deg) translate(0px,0px)`)
  const [motion, setMotion] = useState<{ [Key: string]: number }>({
    s: 0,
    x: 0,
    y: 0,
  })
  const orientation = useRef<Orientations>(
    computeOrientation(window.orientation)
  )

  function computeOrientation(o: number): Orientations {
    return o > 0 ? 2 : o < 0 ? 1 : o
  }
  function handleOrientation(): void {
    const o = window.orientation
    orientation.current = computeOrientation(o)
  }

  useEffect(() => {
    function handleMotion(e: DeviceOrientationEvent) {
      if (e.gamma && e.beta) {
        //setMotion({ y: e.gamma, x: e.beta })
        if (orientation.current === 0) {
          setMotion(
            {
              s: -e.gamma / 8,
              x: e.gamma,
              y: e.beta,
            }
            //`skew(${-e.gamma / 8}deg) translate(${e.gamma}px, ${e.beta}px)`
          )
        } else if (orientation.current === 1) {
          setMotion(
            { s: e.beta / 8, x: -e.beta, y: e.gamma }
            //`skew(${e.beta / 8}deg) translate(${-e.beta}px, ${e.gamma}px)`
          )
        } else {
          setMotion(
            { s: -e.beta / 8, x: e.beta, y: -e.gamma }
            //`skew(${-e.beta / 8}deg) translate(${e.beta}px, ${-e.gamma}px)`
          )
        }
      }
    }
    window.addEventListener("deviceorientation", handleMotion, true)
    window.addEventListener("orientationchange", handleOrientation)
    return () => {
      window.removeEventListener("deviceorientation", handleMotion)
      window.removeEventListener("orientationchange", handleOrientation)
    }
  }, [handleOrientation])

  return {
    s: {
      transform: `skew(${motion.s}deg) translate(${motion.x}px, ${motion.y}px)`,
    },
    v: { x: motion.x, y: motion.y },
  }
}
export default FloatingMenu
