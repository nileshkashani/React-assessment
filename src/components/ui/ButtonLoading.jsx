import { Button } from "@/components/ui/button"
import { Spinner } from "./spinner"
import { useEffect } from "react"

export function ButtonLoading({ loading }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="text-blue-400 hover:text-blue-600 cursor-pointer"
    >
        Login
      {loading===true && <Spinner/>}
    </Button>
  )
}
