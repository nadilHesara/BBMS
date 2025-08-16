import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";                 // NEW
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapPicker({ open, onClose, onSelect }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (!open) return;

    const loader = new Loader({
      apiKey: GOOGLE_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let cancelled = false;

    loader.load().then((google) => {
      if (cancelled) return;

      const center = { lat: 6.9271, lng: 79.8612 };

      mapInstance.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      geocoderRef.current = new google.maps.Geocoder();

      const updatePick = async (lat, lng) => {
        let address = "";
        try {
          const { results } = await geocoderRef.current.geocode({ location: { lat, lng } });
          address = results?.[0]?.formatted_address || "";
        } catch {
          address = "";
        }
        const link = `https://maps.google.com/?q=${lat},${lng}`;
        setPicked({ lat, lng, address, link });
      };

      mapInstance.current.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        if (!markerRef.current) {
          markerRef.current = new google.maps.Marker({
            position: { lat, lng },
            map: mapInstance.current,
            draggable: true,
          });
          markerRef.current.addListener("dragend", (ev) => {
            updatePick(ev.latLng.lat(), ev.latLng.lng());
          });
        } else {
          markerRef.current.setPosition({ lat, lng });
        }

        updatePick(lat, lng);
      });
    });

    
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelled = true;
      setPicked(null);
      markerRef.current = null;
      mapInstance.current = null;
      geocoderRef.current = null;
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  
  return createPortal(
    <div className="mappicker-backdrop" role="dialog" aria-modal="true">
      <div className="mappicker-card">
        <div ref={mapRef} className="mappicker-map" />
        <div className="mappicker-actions">
          <div className="mappicker-info">
            {picked ? (
              <>
                <div><strong>Address:</strong> {picked.address || "—"}</div>
                <div><strong>Link:</strong> {picked.link}</div>
              </>
            ) : (
              <div>Click on the map to drop a pin.</div>
            )}
          </div>
          <div className="mappicker-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button
              type="button"
              disabled={!picked}
              onClick={() => picked && onSelect(picked)}
            >
              Use this location
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
