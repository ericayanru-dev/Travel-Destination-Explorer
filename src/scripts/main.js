import { homeUnsplash, footer } from "./utility.js";

const menu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();

    if (query === "") return alert("Please enter a destination.");

    // Redirect to results page with search parameter
    window.location.href = `./results.html?search=${encodeURIComponent(query)}`;
});

const featured = ["Lagos", "Dubai", "Paris"];

async function loadFeatured() {
    const container = document.getElementById("featuredDestinations");
    container.innerHTML = ""; // clear container first

    for (const city of featured) {
        // Fetch image for each city INSIDE the loop
        const photoData = await homeUnsplash(city);

        const card = document.createElement("div");
        card.classList.add("destination-card");

        const details = document.createElement("div");
        details.classList.add("detail-card");


        // Create image element
        const img = document.createElement("img");
        img.alt = `${city} image`;
        img.classList.add("featured-img");

        // Image source
        if (photoData) {
            img.src = photoData.urls.small;
        } else {
            img.src = "fallback.jpg";
        }

        // Title (use Unsplash alt_description or city name)
        const title = document.createElement("p");
        title.textContent = photoData?.alt_description || city;

        // Location
        const location = document.createElement("p");
        location.classList.add("location");
        location.textContent = `Location: ${city}`;

        // Description
        const desc = document.createElement("p");
        desc.classList.add("description");
        desc.textContent =
            photoData?.description ||
            photoData?.alt_description ||
            `Explore the beauty of ${city}.`;

        // Append to card
        card.appendChild(img);
        details.appendChild(title);
        details.appendChild(location);
        details.appendChild(desc);
        card.appendChild(details)
        container.appendChild(card);
    }
}

loadFeatured();

footer();