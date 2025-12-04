// map.js
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export function initializeMap(containerId = "map", center = [0, 0], zoom = 2) {
    const map = new mapboxgl.Map({
        container: containerId,
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: zoom
    });

    return map;
}

export function addMarker(map, coords, popupText = "") {
    new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setText(popupText))
        .addTo(map);
}
