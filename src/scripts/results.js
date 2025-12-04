// main.js
import { searchUnsplash, geocode } from "./fetch.js";
import { initializeMap, addMarker } from "./map.js";


const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

let mapInstance = initializeMap(); // default global map

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value;
    if (!query) return alert("Please enter a location");

    display(query)
});

async function display(query) {
        try {
            // 1️⃣ Fetch and display photos
            searchUnsplash(query, "#gallery");
        

            // 2️⃣ Fetch coordinates
            const location = await geocode(query);

            // 3️⃣ Center map on new location
            const map = initializeMap("map", location, 9)
            mapInstance.setCenter(location);

            // 4️⃣ Add a marker
            addMarker(map, location);

        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    }
const params = new URLSearchParams(window.location.search);

// Get the value of ?search=
const query = params.get("search");
display(query)