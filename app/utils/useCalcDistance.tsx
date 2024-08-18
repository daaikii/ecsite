// 二つの緯度、経度からkm単位で距離を出力する
const R = Math.PI / 180;

const useCalcDistance =
  (
    { shopLat, shopLng }: { shopLat: number, shopLng: number },
    { userLat, userLng }: { userLat: number, userLng: number }
  ) => {
    shopLat *= R;
    shopLng *= R;
    userLat *= R;
    userLng *= R;
    return 6371 * Math.acos(Math.cos(shopLat) * Math.cos(userLat) * Math.cos(userLng - shopLng) + Math.sin(shopLat) * Math.sin(userLat));
  }

export default useCalcDistance
