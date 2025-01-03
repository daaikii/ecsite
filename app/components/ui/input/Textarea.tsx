import { FC } from "react"
import { UseFormRegister, FieldValues, FieldErrors, Path, FieldValue } from "react-hook-form"
import clsx from "clsx"
import { FaExclamationTriangle } from "react-icons/fa"
import { ItemFormSchema } from "@/lib/validation/itemForm"

type InputProps<TFormSchema extends FieldValues> = {
  disabled: boolean,
  register: UseFormRegister<TFormSchema>,
  errors: FieldErrors<TFormSchema>,
  id: string,
  label: string,
  placeholder?: string
}

function Textarea<TFormSchema extends FieldValues>({
  disabled,
  register,
  errors,
  id,
  label,
  placeholder
}
  : InputProps<TFormSchema>
) {
  return (
    <div className='mb-6' >

      <div className="text-custom-point  flex items-center">
        {errors[id]?.message && <FaExclamationTriangle />}
        <p>{errors[id]?.message as string}</p>
      </div>

      <label htmlFor={id} className={clsx(`mb-2 block  text-l font-bold text-start`)}>
        {label}
      </label>

      <textarea
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id as Path<TFormSchema>)}
        className="w-full h-20 resize-none  border border-[#d9d9d9]  placeholder:opacity-50"
      />

    </div>
  )
}

export default Textarea