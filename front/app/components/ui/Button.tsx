type ButtonProps = {
  label: string,
  disabled: boolean,
  onClick?: () => void
}

const Button = ({ label, disabled, onClick }: ButtonProps) => {
  return (
    <button onClick={() => onClick} disabled={disabled}>{label}</button>
  )
}

export default Button