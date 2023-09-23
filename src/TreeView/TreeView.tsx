import { useEffect } from "react"

function TreeView(props: { data: any }) {
  useEffect(() => {
    console.log(props.data)
  }, [])
  return <div></div>
}

export default TreeView
