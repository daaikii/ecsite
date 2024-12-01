"use client"
import { FC } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image";

import GoogleMapComponent from "@/app/components/ui/GoogleMap";
import Button from "@/app/components/ui/Button"
import { useStore, usePurposeStore } from "@/lib/context/purpose";
import { ItemDTO } from "@/lib/types/data";
import useErrorMessage from "@/lib/hooks/useErrorMessage";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import useLoading from "@/lib/hooks/useLoading";
import deleteItem from "@/server/actions/item/delete";
import handleItemAccess from "@/server/actions/handleItemAccess";

type ItemDetailProps = {
  item: ItemDTO,
  isCurrentUser: boolean
}

const ItemDetail: FC<ItemDetailProps> = ({ item, isCurrentUser }) => {
  console.log(item.shop?.latitude)
  console.log(item.shop?.longitude)

  const router = useRouter()
  //context
  const purpose = useStore(usePurposeStore, state => state.purpose)
  //custom hook
  const { errorMessage, setErrorMessage } = useErrorMessage()
  const { isLoading, startLoading, stopLoading } = useLoading()

  // update
  const updateRoute = async () => {
    if (!isCurrentUser || !purpose) return
    startLoading()
    const res = await handleItemAccess({ item, purpose })
    if (!res.isOwner) {
      setErrorMessage(res.message!)
      return null
    }
    await router.push(res.redirectUrl!)
    stopLoading()
  }

  // delete
  const onDelete = async () => {
    if (!isCurrentUser || !purpose) return
    startLoading()
    const res = await deleteItem(item)
    if (res instanceof Error) {
      setErrorMessage(res.message)
      return null
    }
    router.push("/")
    stopLoading()
  }

  return (
    <>
      <div className="relative w-full h-[300px]">
        <Image src={encodeURIComponent(item.imageURL)} alt={item.name} width={1920} height={1080} className="object-cover block w-full h-full" />
      </div>

      <div className="px-[20px] py-[40px] md:px-[200px] xl:px-[400px]">
        <dl
          className="
            flex flex-wrap

            [&>dt]:w-[30%]
            [&>dt]:font-bold
            [&>dt]:border-b
            [&>dt]:border-dashed

            [&>dd]:pl-[10%]
            [&>dd]:w-[70%]
            [&>dd]:border-b
            [&>dd]:border-dashed
          "
        >
          <dt>商品名</dt>
          <dd>{item.name}</dd>
          <dt>値段</dt>
          <dd>{item.price}</dd>
          <dt>販売者の名称及び住所</dt>
          <dd>
            <span >{item.shop?.name}</span>
            <span >{item.shop?.address}</span>
          </dd>
          <dt>賞味期限</dt>
          <dd>{item.expirationDate}</dd>
          <dt>在庫</dt>
          <dd>{item.stock}</dd>
          <dt>詳細</dt>
          <dd>{item.detail}</dd>
        </dl>
      </div >

      {purpose === "SHOP" &&
        isCurrentUser &&
        <div className="w-[300px] mx-auto flex gap-2">
          <Button label="編集" disabled={isLoading} onClick={updateRoute} />
          <Button label="削除" disabled={isLoading} onClick={onDelete} />
        </div>
      }

      {/* エラー表示 */}
      <ErrorMessage message={errorMessage} />

      {/* GoogleMap */}
      {item.shop?.latitude &&
        item.shop.longitude &&
        <GoogleMapComponent lat={item.shop.latitude} lng={item.shop.longitude} isEventEnabled={false} />
      }
    </>
  )
}

export default ItemDetail