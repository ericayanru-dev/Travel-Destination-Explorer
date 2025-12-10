import { setLocalStorage, getLocalStorage, remove, returnApiArray } from "./utility.js";
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

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (!menu || !navLinks) return;

    menu.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});

    const photos = await returnApiArray(locationName)
    const gallery = document.getElementById("gallery-grid");
    gallery.innerHTML = "";

    const image = photos.find(p => p.id === id);

    if (image) {
        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Destination Image";
        gallery.appendChild(img);
    }

// Load and center map
const location = await geocode(locationName);
const map = initializeMap("map", location, 10);
addMarker(map, location);

// Example description
document.getElementById("destination-description").textContent =
    `${locationName} is a beautiful destination offering unique experiences.`;



// ⭐ Add to Favorites
document.getElementById("favorite-btn").addEventListener("click", () => {
  const favBtn = document.querySelector("#favorite-btn");
    // Always an array
    let favorites = getLocalStorage("favorites") || [];

    // Check if already saved
    const exists = favorites.find(item => item.id === id);

    if (exists) {
         // REMOVE from favorites
        favorites = remove(favorites, id, locationName, favBtn);
    } else {
        // ADD to favorites
        favorites.push({ id, locationName });
      alert(`${locationName} added to favorites!`);
      favBtn.textContent =`Remove from Favorites`

    }

    // Save updated list
    setLocalStorage("favorites", favorites);

    // Update button text
    updateFavoriteButton();
});

// Call this on load
updateFavoriteButton();