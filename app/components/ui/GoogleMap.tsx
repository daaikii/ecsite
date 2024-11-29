"use client";
import { FC, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";


type GoogleMapProps = {
  lat: number;
  lng: number;
  isEventEnabled: boolean;
};

interface MarkerEvent {
  domEvent: google.maps.MouseEvent; // Google MapsのMouseEvent型
  latLng: google.maps.LatLng; // google.maps.LatLng型
}


const GoogleMapComponent: FC<GoogleMapProps> = ({ lat, lng, isEventEnabled }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let clickListener: google.maps.MapsEventListener | null = null;
    let dragEndListener: google.maps.MapsEventListener | null = null;
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
      });

      try {
        const { Map, InfoWindow } = await loader.importLibrary("maps");
        const { AdvancedMarkerElement } = await loader.importLibrary("marker"); // markerライブラリを正しくインポート
        const center = { lat, lng };
        const mapOptions: google.maps.MapOptions = {
          center,
          zoom: 16,
        };

        if (mapRef.current) {
          // 地図の初期化
          const map = new Map(mapRef.current, {
            ...mapOptions, // MapOptionsを適用
            mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_MAPID, // mapIdをMapコンストラクタに渡す
          });

          // AdvancedMarkerElement の作成
          const marker = new AdvancedMarkerElement({
            map,
            position: center,
            title: "中心地点", // ツールチップを表示するタイトル
            gmpClickable: true,
            gmpDraggable: true,
          });

          if (isEventEnabled) {
            // サークル作成
            new google.maps.Circle({
              map,
              center,
              radius: 1000,
              fillColor: "#FF0000",
              fillOpacity: 0.2,
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            });

            const setInfo = (latLng: google.maps.LatLng) => {
              infoWindow.close();
              // latLngを文字列に変換してセット
              const latLngString = `緯度: ${latLng.lat()}, 経度: ${latLng.lng()}`;
              infoWindow.setContent(`<div style="cursor:text;padding:0 2rem">${latLngString}</div>`);
              infoWindow.open(marker.map, marker);
            }

            const infoWindow = new InfoWindow()
            clickListener = marker.addListener('click', ({ domEvent, latLng }: MarkerEvent) => {
              setInfo(latLng)
            });
            dragEndListener = marker.addListener('dragend', ({ domEvent, latLng }: MarkerEvent) => {
              setInfo(latLng)
            });
          }

        } else {
          console.error("mapRef.current is null or undefined");
        }
      } catch (error) {
        console.error("Google Maps API error:", error);
      }
    };

    initMap();
    return () => {
      if (isEventEnabled) {
        clickListener && google.maps.event.removeListener(clickListener);
        dragEndListener && google.maps.event.removeListener(dragEndListener);
      }
    }
  }, [lat, lng]);

  return <div ref={mapRef} style={{ height: "100vh" }} />;
};

export default GoogleMapComponent;
