import { FC } from "react"
import Head from "next/head"
import AuthForm from "./components/AuthForm"

const Page: FC = () => {
  return (
    <>
      <Head>
        <title>AUTH FORM</title>
        <meta name="description" content="" />
      </Head>
      <AuthForm />
    </>
  )
}
export default Page