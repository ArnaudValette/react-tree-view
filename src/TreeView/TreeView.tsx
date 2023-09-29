import React, { PropsWithChildren, ReactChildren, ReactPropTypes, createContext, useContext, useReducer, useState } from "react"
import FloatingMenu from "../fancy-components/Floating-Menu"
import { createPortal } from "react-dom"
import { TreeStackContext } from "../App"

const x = createContext({})

function TreeViewRoot(props: { data: any, customDispatcher?: any, level?:number }) {
  const nodes:Array<any> = Object.entries(props.data)
    const { treeStack, pushTreeStack } = useContext(TreeStackContext)
  const level = props.level || 0
  const customDispatcher = props.customDispatcher || {}
  const dispatcher = {...baseDispatcher, ...customDispatcher}

  return <div>{nodes.map((entry,i)=><NodeHandler level={level+1} Component={dispatcher[`${entry[1].type}`]} data={entry} key={i} /> )}</div>
}

function NodeHandler({Component , data, level}:any){
    const [t, sT] = useState(false)
  function handleClick(){
    if(data[1].children){
      sT(true)
    }
  }
  return <><div onClick={()=>handleClick()}><Component data={data[1]} />
  </div>
  {t ?
   /*TODO: Absolute positionned/portaled FloatingMenu, maybe we need a component stack*/
   <Portal><FloatingMenu className="EffectZone"><TreeViewRoot level={level} data={data[1].children} /></FloatingMenu></Portal>
 : <></>}
  </>
}

function Portal(props:PropsWithChildren){
    const element: Element | null = document.getElementById("portalFrame")
    return element ? createPortal(<div className="portal">{props.children}</div>, element ):<></>
}

function HeadingNode(props:any){
  return <h1>{props.data.display}</h1>
}
function ProfileNode(props:any){
  return <></>
}
function FolderNode(props:any){
  return <></>
}
function ImageNode(props:any){
  return <></>
}
function TextNode(props:any){
  return <></>
}
const baseDispatcher={
  "heading": HeadingNode,
  "profile": ProfileNode,
  "image": ImageNode,
  "folder": FolderNode,
  "text": TextNode,
}
export default TreeViewRoot
