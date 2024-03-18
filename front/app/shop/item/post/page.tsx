import { FC } from "react"

import PostItemForm from "./components/PostItemForm"
import Head from "next/head"

const Page: FC = () => {
  return <>
    <Head>
      <title>ITEM FORM</title>
      <meta name="description" content="" />
    </Head>
    <PostItemForm />
  </>
}

export default Page