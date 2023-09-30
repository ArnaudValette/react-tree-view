import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import FloatingMenu from "../fancy-components/Floating-Menu"
import { createPortal } from "react-dom"
import { TreeStackContext } from "../App"
import { CloseButton } from "../fancy-components/Buttons"

function TreeViewRoot(props: {
  data: any
  transition?: Function
  tr?: number | boolean
  leave?: Function
  customDispatcher?: any
  level?: number
}) {
  const nodes: Array<any> = Object.entries(props.data)
  const { treeStack, pushTreeStack } = useContext(TreeStackContext)
  const level = props.level || 0
  const customDispatcher = props.customDispatcher || {}
  const dispatcher = { ...baseDispatcher, ...customDispatcher }

  return (
    <>
      <div className="node-body">
        <CloseButton behavior={props.transition} />
        {nodes.map((entry, i) => (
          <NodeHandler
            pusher={pushTreeStack}
            level={level + 1}
            Component={dispatcher[`${entry[1].type}`]}
            data={entry}
            key={i}
          />
        ))}
      </div>
      <Portal condition={treeStack[level + 1]}>
        <NextTree level={level + 1} data={treeStack[level + 1]} />
      </Portal>
    </>
  )
}

export function NextTree({ level, data, state }: any) {
  const { popTreeStack } = useContext(TreeStackContext)
  const [tr, setTr] = useState(0)
  const [blurCond, setBC] = useState(true)

  function leave() {
    return tr === 0
      ? null
      : level === 0
      ? clearBlur(() => state?.setToggle(0))
      : clearBlur(() => popTreeStack(level))
  }

  function clearBlur(x: Function) {
    setBC(false)
    x()
  }
  function transition() {
    setTr(1)
  }

  return data ? (
    <>
      <Portal condition={blurCond && level !== 0} blur={true}>
        <div className={tr ? "blur-out" : "blur"}></div>
      </Portal>
      <FloatingMenu
        className={tr ? "EffectZone-out" : "EffectZone"}
        onAnimationEnd={leave}
      >
        <TreeViewRoot
          level={level}
          data={data}
          transition={transition}
          leave={leave}
          tr={tr}
        />
      </FloatingMenu>
    </>
  ) : (
    <></>
  )
}

function NodeHandler({ Component, data, level, pusher }: any) {
  function handleClick() {
    if (data[1].children) {
      pusher(data[1].children, level)
    }
  }
  return (
    <>
      <div onClick={() => handleClick()}>
        <Component data={data[1]} />
      </div>
    </>
  )
}

function Portal(
  props: PropsWithChildren & {
    condition: any
    blur?: boolean
    loc?: string
  }
) {
  const element: Element | null = document.getElementById(
    props.loc || "portalFrame"
  )

  return element && props.condition ? (
    createPortal(
      <>
        <div className={props.blur ? "portal-blur" : "portal"}>
          {props.children}
        </div>
      </>,
      element
    )
  ) : (
    <></>
  )
}

function HeadingNode(props: any) {
  return <h1>{props.data.display}</h1>
}
function ProfileNode(props: any) {
  return (
    <div className="profile">
      <img src={props.data.picture} alt="" className="profile-picture" />
      <span className="firstname">{props.data.name}</span>
      <span className="surname">{props.data.surname}</span>
    </div>
  )
}

function ImageNode(props: any) {
  return (
    <div className="image-node-wrapper">
      <img src={props.data.data} alt="" className="image-node" />
    </div>
  )
}
function FolderNode(props: any) {
  return <h2>{props.data.display}</h2>
}
function TextNode(props: any) {
  return <p>{props.data.title}</p>
}
const baseDispatcher = {
  heading: HeadingNode,
  profile: ProfileNode,
  image: ImageNode,
  folder: FolderNode,
  text: TextNode,
}
export default TreeViewRoot
