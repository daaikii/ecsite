import clsx from "clsx"

type Props = { changePurpose: () => void, isUser: boolean, isShop: boolean }


const PurposeToggle = ({ changePurpose, isUser, isShop }: Props) => {
  return <div className="mb-6 flex justify-between border-b ">
    <div
      className={clsx(`
        px-5 py-2 bg-white text-2xl font-bold cursor-pointer
        `, isUser && `mb-[-1px] border-t border-x`
      )}
      onClick={() => { isShop && changePurpose() }}
    >USER</div>

    <div
      className={clsx(`
        px-5 py-2 bg-white text-2xl font-bold cursor-pointer
        `, isShop && `mb-[-1px] border-t border-x`
      )}
      onClick={() => { isUser && changePurpose() }}
    >SHOP</div>
  </div>

}

export default PurposeToggle