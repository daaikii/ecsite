"use client"
import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors, Control, useWatch } from "react-hook-form"
import clsx from "clsx"
import { FaExclamationTriangle } from "react-icons/fa"

type InputProps = {
  disabled: boolean,
  required: boolean,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  id: string,
  label: string,
}

const Input: FC<InputProps> = ({
  disabled,
  required,
  register,
  errors,
  id,
  label,
}) => {
  return (
    <div className='mb-6'>

      <div className="text-custom-point flex items-center">
        {errors[id]?.message && <FaExclamationTriangle />}
        <p>{errors[id]?.message as string}</p>
      </div>

      <label
        htmlFor={id}
        className={clsx(`mb-2 block text-l font-bold text-start`)}
      >
        {label}
      </label>

      <textarea
        id={id}
        disabled={disabled}
        {...register(id, {
          required: {
            value: required,
            message: `${label}を入力して下さい`
          },
          maxLength: {
            value: 100,
            message: `${label}は100字までです`
          }
        })}
        className={clsx(
          `
              w-full
              border 
            border-[#d9d9d9] 
            
              h-20 
              resize-none
            `
        )}
      />

    </div>
  )
}

export default Input