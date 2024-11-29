type Props = {
  variant: "REGISTER" | "LOGIN"
  changeVariant: () => void
}

const VariantToggle = ({ variant, changeVariant }: Props) => {
  return <div className="mt-20">
    <p>アカウントをお持ちですか?</p>
    <div onClick={() => changeVariant()} className="text-cl_sm text-custom-point hover:text-custom-main cursor-pointer">
      {variant === "LOGIN" ? "REGISTER" : "LOGIN"}
    </div>
  </div>

}

export default VariantToggle