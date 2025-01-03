export const dynamic = "force-dynamic";

import { FC } from "react"

import PostItemForm from "./components/PostItemForm"

const Page: FC = () => {
  return <>
    <title>ITEM FORM</title>
    <PostItemForm />
  </>
}

export default Page