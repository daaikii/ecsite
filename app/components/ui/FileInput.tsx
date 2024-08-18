"use client"
import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors, UseFormWatch } from "react-hook-form"
import { FaExclamationTriangle } from "react-icons/fa"

type InputProps = {
  disabled: boolean,
  required: boolean,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>
  type: string,
  id: string,
  label?: string,
  watch: UseFormWatch<FieldValues>
}

const FileInput: FC<InputProps> = ({
  disabled,
  required,
  register,
  errors,
  type,
  id,
  label,
  watch
}) => {
  return (
    <div className='mb-6'>

      <div className="text-custom-point flex items-center">
        {errors[id]?.message && <FaExclamationTriangle />}
        <p>{errors[id]?.message as string}</p>
      </div>

      <label htmlFor={id} className="mb-1 block text-l font-bold text-start">
        <span className="text-start">{label}</span>
      </label>
      <input
        className="block text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-bold
          file:bg-custom-pastel file:text-white
          relative left-[50%] translate-x-[-50%]
        "
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, {
          required: {
            value: required,
            message: `画像を選択してください`
          },
        })}
      />

    </div>
  )
}

export default FileInput