import { useState, useEffect } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  purpose: "USER" | "SHOP"
}

type Action = {
  setGlobalPurpose: (purpose: "USER" | "SHOP") => void
}


export const usePurposeStore = create<State & Action>()(
  persist(
    (set) => ({
      purpose: "USER",
      setGlobalPurpose: (purpose: "USER" | "SHOP") => set(() => ({
        purpose: purpose
      }))
    }), { name: "purpose-storage" }
  )
)

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}