import { use } from "react";

// 二つの緯度、経度からkm単位で距離を出力する
const R = Math.PI / 180;

const useCalcDistance =
  (
    { lat1, lng1 }: { lat1: number, lng1: number },
    { lat2, lng2 }: { lat2: number, lng2: number }
  ) => {
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
  }

export default useCalcDistance