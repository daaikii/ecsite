import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { usePurposeStore } from "@/lib/context/purpose"

export default function PurposeObserver() {
  const { data: session } = useSession()
  const setGlobalPurpose = usePurposeStore((state) => state.setGlobalPurpose)
  useEffect(() => {
    if (!session?.user || !session.user.purpose) {
      return
    }
    setGlobalPurpose(session.user.purpose)
  }, [session, setGlobalPurpose])
  return <></>
}