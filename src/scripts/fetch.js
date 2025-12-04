import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;


export async function searchUnsplash(query,id) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  displayPhotos(data.results,id, query);
}

function displayPhotos(results, id, query) {
  const container = document.querySelector(id);
  container.innerHTML = "";

  results.forEach(photo => {
    const link = document.createElement("a")
    link.href = `destination.html?destination=${encodeURIComponent(photo.id)}&location=${encodeURIComponent(query)}`;
    const card = document.createElement("div");
        card.classList.add("result-card");

        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Image";

        const title = document.createElement("h3");
        title.classList.add("result-title");
        title.textContent = photo.alt_description || "Untitled Image";

        const summary = document.createElement("p");
        summary.classList.add("result-summary");
        summary.textContent = photo.description || "No description available.";

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(summary);

        container.appendChild(link);
        link.appendChild(card)
  });
}

export async function geocode(query) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return [ lng, lat];
    } else {
        throw new Error("Location not found");
    }
}