import Login from "@/components/auth/Login"
import LoadingSkeleton from "@/components/loading/LoadingSkeleton"
import { Suspense } from "react"


const Page = () => {
  return (
    <Suspense fallback={<div><LoadingSkeleton/></div>}>
      <Login />
    </Suspense>
  )
}

export default Page