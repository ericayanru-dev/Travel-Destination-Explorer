import { getLocalStorage, setLocalStorage, remove, returnApiArray, footer } from "./utility.js";

const grid = document.getElementById("favorites-grid");

// Load saved destinations
let favorites = getLocalStorage("favorites") || [];

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (!menu || !navLinks) return;

    menu.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});


async function loadFavorites() {
    grid.innerHTML = "";

    if (favorites.length === 0) {
        grid.innerHTML = "<p>No favorites saved.</p>";
    }

    // Build each card
    for (const fav of favorites) {
         // Fetch all images for this location
        const photos = await returnApiArray(fav.locationName);

        // Find the exact image by ID
        const imageObj = photos.find(p => p.id === fav.id);

        // Create card
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${imageObj?.urls?.small || ""}" alt="${fav.location}">
            <div class="card-content">
                <h3>${fav.locationName}</h3>
                <button class="remove-btn" data-id="${fav.id}">Remove</button>
            </div>
        `;

        grid.appendChild(card);
    }

    attachRemoveEvents();
}

function attachRemoveEvents() {
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;

            favorites = favorites.filter(item => item.id !== id);

            setLocalStorage("favorites", favorites);

            loadFavorites(); // refresh UI
        });
    });
}

loadFavorites();

footer();