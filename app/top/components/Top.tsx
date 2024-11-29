import GoogleMapComponent from "@/app/components/ui/GoogleMap"

export default function Top() {
  return (
    <div className="px-12">
      <title>TOP</title>
      <div className="py-10">
        <p className="text-lg ">このサイトは半径1kmを範囲として該当したショップを表示します。</p>
        <p className="text-lg ">ショップを作成する場合、以下の範囲を参照に作成してください。</p>
      </div>
      <div className="pb-5">
        <p className="font-bold">ユーザーの位置</p>
        <p className="text-gray-400">※開発では位置情報を使用しないためユーザーの位置を以下の数値に固定しています。</p>
        <p>latitude（緯度） : 35.65462091752649</p>
        <p>longitude（経度） : 139.2883457074043</p>
      </div>
      <div className="pb-5">
        <GoogleMapComponent lat={35.65462091752649} lng={139.2883457074043} isEventEnabled={true} />
      </div>
    </div>
  )
}