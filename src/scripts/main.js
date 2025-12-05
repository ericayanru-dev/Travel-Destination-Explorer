import { homeUnsplash } from "./utility.js";



document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();

    if (query === "") return alert("Please enter a destination.");

    // Redirect to results page with search parameter
    window.location.href = `./results.html?search=${encodeURIComponent(query)}`;
});


const featured = ["Lagos", "Dubai", "Paris", "Tokyo"];

async function loadFeatured() {
    const container = document.getElementById("featuredDestinations");
    container.innerHTML = ""; // clear first

    for (const city of featured) {
        const card = document.createElement("div");
        card.classList.add("destination-card");

        // Title first
        const title = document.createElement("h3");
        title.textContent = city;

        // Image placeholder
        const img = document.createElement("img");
        img.alt = `${city} image`;
        img.classList.add("featured-img");

        card.appendChild(title);
        card.appendChild(img);
        container.appendChild(card);

        // Fetch image from Unsplash
        const photoData = await homeUnsplash(city);

        if (photoData) {
            img.src = photoData.urls.small;
        } else {
            img.src = "fallback.jpg"; // optional fallback
        }
    }
}

loadFeatured();


