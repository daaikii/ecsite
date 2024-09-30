type Props = {
  variant: "REGISTER" | "LOGIN"
  changeVariant: () => void
}

const VariantToggle = ({ variant, changeVariant }: Props) => {
  return <div className="mt-20">
    <p>アカウントをお持ちですか?</p>
    <div onClick={() => changeVariant()} className="text-link">
      {variant === "LOGIN" ? "REGISTER" : "LOGIN"}
    </div>
  </div>

}

export default VariantToggle