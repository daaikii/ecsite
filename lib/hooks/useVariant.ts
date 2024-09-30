import { useState, useMemo, useCallback } from "react"

export function useVariant() {
  const [variant, setVariant] = useState<"REGISTER" | "LOGIN">("LOGIN")
  const changeVariant = useCallback(() => {
    setVariant(prev => prev === "LOGIN" ? "REGISTER" : "LOGIN")
  }, [variant])
  const isLogin = useMemo(() => variant === "LOGIN", [variant])
  const isRegister = useMemo(() => variant === "REGISTER", [variant])
  return { variant, changeVariant, isLogin, isRegister }
}