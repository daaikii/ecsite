"use client"
import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"
import clsx from "clsx"
import { FaExclamationTriangle } from "react-icons/fa";

type InputProps = {
  disabled: boolean,
  required: boolean,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
  type: string,
  id: string,
  label?: string,
  placeholder?: string,
  forNumber?: boolean,
}

const Input: FC<InputProps> = ({
  disabled,
  required,
  register,
  errors,
  type,
  id,
  label,
  placeholder,
  forNumber,
}) => {
  return (
    <div className='mb-6'>

      <div className="text-custom-point flex items-center">
        {errors[id]?.message && <FaExclamationTriangle />}
        <p>{errors[id]?.message as string}</p>
      </div>

      {!placeholder && <label htmlFor={id} className="mb-1 block text-l font-bold text-start">{label}</label>}

      <input
        className={clsx(`w-full border border-[#d9d9d9]`)}
        type={type}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id, {
          required: {
            value: required,
            message: `${label}を入力してください`
          },
          pattern: {
            value: forNumber ? /^\d+(?:\.\d+)?$/ : /.*/,
            message: forNumber ? "数字を入力してください" : "改行のみ使用できません。"
          },
          maxLength: {
            value: 30,
            message: `${label}は30字までです`
          }
        })}
      />

    </div>
  )
}

export default Input