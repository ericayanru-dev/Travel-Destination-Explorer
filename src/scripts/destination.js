import { setLocalStorage, getLocalStorage } from "./utility.js";
import { geocode } from "./fetch.js";
import { initializeMap, addMarker } from "./map.js";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Get query parameters
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const locationName = params.get("location");

// Set title
document.getElementById("destination-title").textContent = locationName;

// Load photo by matching ID
async function loadPhotos() {
    const url = `https://api.unsplash.com/search/photos?query=${locationName}&client_id=${UNSPLASH_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    const photos = data.results;
    const gallery = document.getElementById("gallery-grid");
    gallery.innerHTML = "";

    const image = photos.find(p => p.id === id);

    if (image) {
        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Destination Image";
        gallery.appendChild(img);
    }
}

loadPhotos();

// Load and center map
const location = await geocode(locationName);
const map = initializeMap("map", location, 9);
addMarker(map, location);

// Example description
document.getElementById("destination-description").textContent =
    `${locationName} is a beautiful destination offering unique experiences.`;

// ⭐ Add to Favorites
document.getElementById("favorite-btn").addEventListener("click", () => {
    const product = { id, location: locationName };

    // Always an array
    let favorites = getLocalStorage("favorites") || [];

    // Check if already saved
    const exists = favorites.find(item => item.id === id);

    if (!exists) {
        favorites.push(product);
    }

    setLocalStorage("favorites", favorites);

    alert(`${locationName} added to favorites!`);
});
