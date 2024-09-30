import { useState, useMemo, useCallback } from "react"

export function usePurpose() {
  const [purpose, setPurpose] = useState<"USER" | "SHOP">("USER")
  const changePurpose = useCallback(() => {
    setPurpose(prev => prev === "SHOP" ? "USER" : "SHOP")
  }, [purpose])
  const isUser = useMemo(() => purpose === "USER", [purpose])
  const isShop = useMemo(() => purpose === "SHOP", [purpose])
  return { purpose, changePurpose, isUser, isShop }
}