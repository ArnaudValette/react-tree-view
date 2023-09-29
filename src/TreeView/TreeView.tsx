import React, {
  PropsWithChildren,
  ReactChildren,
  ReactPropTypes,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react"
import FloatingMenu from "../fancy-components/Floating-Menu"
import { createPortal } from "react-dom"
import { TreeStackContext } from "../App"
import { MenuToggleState } from "../fancy-components/MenuToggle"

function TreeViewRoot(props: {
  data: any
  state?: MenuToggleState
  customDispatcher?: any
  level?: number
}) {
  const nodes: Array<any> = Object.entries(props.data)
  const { treeStack, pushTreeStack, popTreeStack } =
    useContext(TreeStackContext)
  const level = props.level || 0
  const customDispatcher = props.customDispatcher || {}
  const dispatcher = { ...baseDispatcher, ...customDispatcher }

  return (
    <>
      <div className="node-body">
        <div
          className="close-button"
          onClick={
            level === 0
              ? () => props.state?.setToggle(0)
              : () => popTreeStack(level)
          }
        >
          ✕
        </div>
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
      {treeStack[level + 1] ? (
        <Portal>
          <FloatingMenu className="EffectZone">
            <TreeViewRoot level={level + 1} data={treeStack[level + 1]} />
          </FloatingMenu>
        </Portal>
      ) : (
        <></>
      )}
    </>
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

function Portal(props: PropsWithChildren) {
  const element: Element | null = document.getElementById("portalFrame")
  return element ? (
    createPortal(<div className="portal">{props.children}</div>, element)
  ) : (
    <></>
  )
}

function HeadingNode(props: any) {
  return <h1>{props.data.display}</h1>
}
function ProfileNode(props: any) {
  return <></>
}
function FolderNode(props: any) {
  return <></>
}
function ImageNode(props: any) {
  return <></>
}
function TextNode(props: any) {
  return <></>
}
const baseDispatcher = {
  heading: HeadingNode,
  profile: ProfileNode,
  image: ImageNode,
  folder: FolderNode,
  text: TextNode,
}
export default TreeViewRoot
