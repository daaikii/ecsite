"use client"
import { FC, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type GoogleMapProps = {
  lat: number,
  lng: number
}

const GoogleMapComponent: FC<GoogleMapProps> = ({ lat, lng }) => {
  const mapRef = useRef(null)

  const center = {
    lat,
    lng
  }

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: 'weekly'
      });

      const { Map } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker')

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 17,
      }

      const map = new Map(mapRef.current, mapOptions)

      const marker = new Marker({
        map: map,
        position: center
      })
    }
    initMap()
  }, [])
  // if (process.env.GOOGLE_MAP_API_KEY) {
  //   return <p>aaa</p>
  // }
  return (
    <div style={{ height: "100vh" }} ref={mapRef} />
  )
}

export default GoogleMapComponent