import React, { createContext, useState } from "react"
import FloatingMenu from "../fancy-components/Floating-Menu"


function TreeViewRoot(props: { data: any, customDispatcher?: any }) {
  const nodes:Array<any> = Object.entries(props.data)
  const customDispatcher = props.customDispatcher || {}
  const dispatcher = {...baseDispatcher, ...customDispatcher}

  return <div>{nodes.map((entry,i)=><NodeHandler Component={dispatcher[`${entry[1].type}`]} data={entry} key={i} /> )}</div>
}

function NodeHandler({Component , data}:any){
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
   <FloatingMenu className="EffectZone"><TreeViewRoot data={data[1].children} /></FloatingMenu>
 : <></>}
  </>
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
