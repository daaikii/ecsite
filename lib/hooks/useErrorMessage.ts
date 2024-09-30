import { useState } from "react"

export default function useErrorMessage() {
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  return { errorMessage, setErrorMessage }
}