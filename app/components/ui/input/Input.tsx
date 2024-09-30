"use client"
import { UseFormRegister, FieldValues, FieldErrors, Path } from "react-hook-form"
import clsx from "clsx"
import { FaExclamationTriangle } from "react-icons/fa";


type InputProps<TFormSchema extends FieldValues> = {
  disabled: boolean
  register: UseFormRegister<TFormSchema>
  errors: FieldErrors<TFormSchema>
  type: string
  id: string
  label?: string
  placeholder?: string
  step?: string
  forNumber?: boolean
}

function Input<TFormSchema extends FieldValues>({
  disabled,
  register,
  errors,
  type,
  id,
  label,
  placeholder,
  step,
  forNumber
}
  : InputProps<TFormSchema>
) {
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
        step={step}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id as Path<TFormSchema>, { valueAsNumber: forNumber })}
      />

    </div>
  )
}

export default Input