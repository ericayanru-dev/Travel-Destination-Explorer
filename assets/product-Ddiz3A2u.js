import{g as c,f as d,r as l,s as m}from"./large-DLUZwNSh.js";const i=document.getElementById("favorites-grid");let n=c("favorites")||[];document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("mobile-menu"),e=document.querySelector(".nav-links");!t||!e||t.addEventListener("click",()=>{e.classList.toggle("show")})});async function s(){i.innerHTML="",n.length===0&&(i.innerHTML="<p>No favorites saved.</p>");for(const t of n){const a=(await l(t.locationName)).find(r=>r.id===t.id),o=document.createElement("div");o.classList.add("card"),o.innerHTML=`
            <img src="${a?.urls?.small||""}" alt="${t.location}">
            <div class="card-content">
                <h3>${t.locationName}</h3>
                <button class="remove-btn" data-id="${t.id}">Remove</button>
            </div>
        `,i.appendChild(o)}v()}function v(){document.querySelectorAll(".remove-btn").forEach(t=>{t.addEventListener("click",e=>{const a=e.target.dataset.id;n=n.filter(o=>o.id!==a),m("favorites",n),s()})})}s();d();
