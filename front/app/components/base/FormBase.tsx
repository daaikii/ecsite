const FormBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-[480px] py-[40px] ">
      <div className="bg-white text-center min-h-[500px] px-60 py-10 ">
        {children}
      </div>
    </div>
  )
}

export default FormBase