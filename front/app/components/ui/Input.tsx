import { UseFormRegister, FieldValues } from "react-hook-form"

type InputProps = {
  type: string,
  id: string,
  label: string,
  disabled: boolean,
  required: boolean,
  register: UseFormRegister<FieldValues>
}

const Input = ({ type, id, label, disabled, required, register }: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block">{label}</label>
      <input type={type} id={id} disabled={disabled} {...register(id, { required })}
        className="border border-[#d9d9d9]"
      />
    </div>
  )
}

export default Input