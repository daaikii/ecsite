import { usePathname } from "next/navigation";

export default function useCleanPath() {
  const currentPath = usePathname();
  const pathParts = currentPath.split("/");
  const path = pathParts.slice(0, -1).join("/");
  return path
}