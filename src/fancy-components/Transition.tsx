import { PropsWithChildren } from "react"

export type TransitionProps = {
  fIn: string
  fOut: string
  delay: number
  condition: boolean
}
export function Transition(props: PropsWithChildren & TransitionProps) {
  return (
    <div
      className={props.condition ? props.fIn : props.fOut}
      style={{ animationDuration: `${props.delay}s` }}
    >
      {props.children}
    </div>
  )
}
