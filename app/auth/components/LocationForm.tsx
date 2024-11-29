import { useState, useCallback } from "react";
import clsx from "clsx"
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from 'next/link'
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

import Input from "@/app/components/ui/input/Input"
import { AuthFormSchema } from "@/lib/validation/authForm";

type Props = {
  isLoading: boolean
  register: UseFormRegister<AuthFormSchema>
  setValue: UseFormSetValue<AuthFormSchema>
  errors: FieldErrors<AuthFormSchema>
}


const LocationForm = ({ isLoading, register, setValue, errors }: Props) => {
  const [isHover, setIsHover] = useState(false)

  //位置情報を取得し、値を設定。
  const getPresentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      if (!position) {
        throw new Error("location info get failed")
      }
      setValue("lat", position.coords.latitude)
      setValue("lng", position.coords.longitude)
    })
  }, [])


  return <div className="mb-6">
    {/* label */}
    <div className="flex justify-start">
      <p className="text-l font-bold text-start">緯度・経度</p>
      <FaRegQuestionCircle onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} />
    </div>


    {/* detail */}
    <div className={clsx(
      `absolute text-start bg-custom-gray border text-white text-xs rounded p-4
          after:content-[''] after:absolute after:top-[-0.6rem] after:left-[70px] after:w-0 after:h-0 
          after:border-l-[0.75rem] after:border-l-transparent after:border-r-[0.75rem] after:border-r-transparent after:border-b-[calc(0.75rem*0.866)] 
          after:border-custom-gray
          `,
      isHover ? "opacity-100 z-10" : " opacity-0 z-0 hidden"
    )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <p>
        GoogleMapを使用し、店舗の詳細から位置を表示するために緯度、経度を使用します。<br />
        入力または位置情報から緯度、経度を取得してください。<br />
        ※GoogleMapからの緯度経度取得方法<br />
        <Link href="https://support.google.com/maps/answer/18539?hl=ja&co=GENIE.Platform%3DDesktop" target="_blank">
          https://support.google.com/maps/answer/18539?hl=ja&co=GENIE.Platform%3DDesktop
        </Link>
      </p>
      <div className="mt-5 text-blue-700">
        <p>
          ※開発では位置情報を使用せず、ユーザーの位置を以下の数値に固定しているため、以下のページを参照して作成をお願いします。<br />
        </p>
        <a className="border-b border-cyan-950 hover:text-cyan-400 hover:cursor-pointer" onClick={() => window.open('https://next13-ecsite-478298788773.asia-northeast1.run.app/top', '_blank')}>こちらを参照してください</a>
      </div>
    </div>


    {/* form */}
    <div className="flex justify-between items-center text-start mb-1">
      <div className="relative w-full">
        <div className="mb-[-1.5rem]">
          <Input<AuthFormSchema> disabled={isLoading} register={register} errors={errors} type="number" id="lat" label="緯度" placeholder="緯度" step="any" forNumber />
        </div>
        <div className="mb-[-1.5rem]">
          <Input<AuthFormSchema> disabled={isLoading} register={register} errors={errors} type="number" id="lng" label="経度" placeholder="経度" step="any" forNumber />
        </div>
      </div>
      <div className="bg-custom-pastel text-white text-xs p-2 rounded hover:cursor-pointer ml-2" onClick={getPresentLocation} ><FaLocationDot /></div>
    </div>

  </div>
}

export default LocationForm