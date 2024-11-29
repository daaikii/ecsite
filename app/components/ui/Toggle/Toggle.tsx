import { SetStateAction, Dispatch } from "react"

import "./toggle.css"


export default function Toggle({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <>
      <div
        className={`toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((state: boolean) => !state)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div >
      <div className={`background ${isOpen ? "open" : ""}`}></div>
    </>
  )
}