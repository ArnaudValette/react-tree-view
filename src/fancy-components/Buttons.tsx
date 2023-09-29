export function CloseButton({ behavior }: any) {
  return (
    <div className="close-button" onClick={() => behavior()}>
      ✕
    </div>
  )
}
