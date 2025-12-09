const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function homeUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}`;
  
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  return data.results[0]; // return only ONE photo
}


// RETRIEVE FROM LOCAL STORAGE
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// SAVING DATA TO LOCAL STORAGE: SAVES KEY-VALUE PAIRS
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}