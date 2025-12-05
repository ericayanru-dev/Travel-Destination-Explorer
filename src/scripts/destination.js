import { homeUnsplash } from "./utility.js";
import { geocode } from "./fetch.js";
import { initializeMap, addMarker  } from "./map.js";

const titleEl = document.getElementById("destinationTitle");
const galleryEl = document.getElementById("gallery");
const infoEl = document.getElementById("destinationInfo");

// Get ?destination=Lagos
const params = new URLSearchParams(window.location.search);
const destination = params.get("destination") || "Unknown";

titleEl.textContent = destination;

//  Load Unsplash photos
async function loadGallery() {
    const images = await homeUnsplash(destination);

    galleryEl.innerHTML = ""; 
    images.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        galleryEl.appendChild(img);
    });
}

// Load Mapbox Map
async function loadMap() {
    const { lng, lat } = await geocode(destination);

    const map = initializeMap("map", [lng, lat], 10);
    addMarker(map, [lng, lat], destination);
}

//  Dummy info text
function loadInfo() {
    infoEl.textContent = `${destination} is a popular travel destination known for its culture, attractions, and unique experiences.`;
}

// ❗ Favorite Button
document.getElementById("favBtn").addEventListener("click", () => {
    alert(`${destination} added to favorites!`);
});

loadGallery();
loadMap();
loadInfo();
