import { create } from "zustand"

type Purpose = {
  purpose: "User" | "Shop"
  setGlobalPurpose: (purpose: "User" | "Shop") => void
}

export const useStore = create<Purpose>((set) => ({
  purpose: "User",
  setGlobalPurpose: (purpose: "User" | "Shop") => set(() => ({
    purpose: purpose
  }))
}))