// ============================================================
// APP LOGIC
// ============================================================

const state = {
  type: "all",        // "all" | "dual" | "fulltime"
  freeOnly: false,
  search: "",
  watchlist: loadWatchlist()
};

const markers = new Map(); // id -> leaflet marker

// ---------- Watchlist persistence ----------
// Uses localStorage — works fine once deployed (e.g. GitHub Pages).
function loadWatchlist() {
  try {
    const raw = localStorage.getItem("csmap.watchlist");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}
function saveWatchlist() {
  try {
    localStorage.setItem("csmap.watchlist", JSON.stringify([...state.watchlist]));
  } catch (e) { /* ignore */ }
}
function toggleWatchlist(id) {
  if (state.watchlist.has(id)) state.watchlist.delete(id);
  else state.watchlist.add(id);
  saveWatchlist();
  renderList();
}

// ---------- Map setup ----------
const map = L.map("map", { zoomControl: true }).setView([51.1, 10.4], 6);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
  subdomains: "abcd",
  maxZoom: 19
}).addTo(map);

function iconFor(program) {
  const cls = program.type === "dual" ? "marker-dual" : "marker-fulltime";
  return L.divIcon({ className: cls, iconSize: [14, 14] });
}

function popupHtml(p) {
  const tuition = p.tuitionFree
    ? `<span style="color:var(--signal-green)">Free</span>`
    : `€${p.tuitionPerSem}/sem`;

  const citiesHtml = p.nearestCities.map(c => `
    <div class="popup__city">
      <span>${c.name} · ${c.distanceKm} km</span>
      <span class="time">${c.travelMinHbf} min → Hbf</span>
    </div>
  `).join("");

  const inWatchlist = state.watchlist.has(p.id);

  return `
    <p class="popup__university">${p.university}</p>
    <p class="popup__program">${p.program}</p>

    <div class="popup__row"><span>Type</span><span>${p.type === "dual" ? "Dual-study" : "Full-time"}</span></div>
    <div class="popup__row"><span>City</span><span>${p.city}</span></div>
    <div class="popup__row"><span>Tuition</span><span>${tuition}</span></div>
    <div class="popup__row"><span>Language</span><span>${p.language}</span></div>
    <div class="popup__row"><span>Job market</span><span>${p.jobMarket}</span></div>
    ${p.company ? `<div class="popup__row"><span>Partner co.</span><span>${p.company}</span></div>` : ""}

    <p class="popup__cities-title">Nearest big cities</p>
    ${citiesHtml}

    <a class="popup__link" href="${p.website}" target="_blank" rel="noopener">Course website ↗</a>
    <button class="popup__watchlist ${inWatchlist ? "active" : ""}" data-id="${p.id}">
      ${inWatchlist ? "★ Watchlisted" : "☆ Add to watchlist"}
    </button>
  `;
}

function buildMarkers() {
  PROGRAMS.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: iconFor(p) }).addTo(map);
    marker.bindPopup(popupHtml(p), { closeButton: true });
    marker.on("popupopen", () => {
      const btn = document.querySelector(`.popup__watchlist[data-id="${p.id}"]`);
      if (btn) btn.addEventListener("click", () => {
        toggleWatchlist(p.id);
        marker.getPopup().setContent(popupHtml(p));
      });
    });
    marker.on("click", () => highlightCard(p.id));
    markers.set(p.id, marker);
  });
}

function highlightCard(id) {
  document.querySelectorAll(".card").forEach(el => el.classList.remove("active"));
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (card) {
    card.classList.add("active");
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// ---------- Filtering ----------
function filteredPrograms() {
  return PROGRAMS.filter(p => {
    if (state.type !== "all" && p.type !== state.type) return false;
    if (state.freeOnly && !p.tuitionFree) return false;
    if (state.search) {
      const hay = `${p.university} ${p.program} ${p.city}`.toLowerCase();
      if (!hay.includes(state.search.toLowerCase())) return false;
    }
    return true;
  });
}

function applyFilters() {
  const visible = new Set(filteredPrograms().map(p => p.id));
  markers.forEach((marker, id) => {
    const shouldShow = visible.has(id);
    const has = map.hasLayer(marker);
    if (shouldShow && !has) marker.addTo(map);
    if (!shouldShow && has) map.removeLayer(marker);
  });
  renderList();
  updateStats();
}

// ---------- List rendering ----------
function renderList() {
  const list = document.getElementById("list");
  const items = filteredPrograms();

  if (items.length === 0) {
    list.innerHTML = `<div class="list__empty">No programs match these filters.</div>`;
    return;
  }

  list.innerHTML = items.map(p => {
    const tagClass = p.type === "dual" ? "tag--dual" : "tag--fulltime";
    const tagLabel = p.type === "dual" ? "Dual" : "Full-time";
    const star = state.watchlist.has(p.id) ? '<span class="star">★</span>' : "";
    const tuitionLabel = p.tuitionFree
      ? `<span class="free">Free</span>`
      : `€${p.tuitionPerSem}/sem`;

    return `
      <div class="card" data-id="${p.id}">
        <div class="card__top">
          <span class="card__university">${star} ${p.university}</span>
          <span class="tag ${tagClass}">${tagLabel}</span>
        </div>
        <div class="card__program">${p.program} · ${p.city}</div>
        <div class="card__meta">
          <span>${tuitionLabel}</span>
          <span>${p.jobMarket} job market</span>
          <span>${p.nearestCities[0].name} ${p.nearestCities[0].travelMinHbf}min</span>
        </div>
      </div>
    `;
  }).join("");

  list.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const marker = markers.get(id);
      if (marker) {
        map.setView(marker.getLatLng(), 9, { animate: true });
        marker.openPopup();
      }
      highlightCard(id);
    });
  });
}

// ---------- Stats (split-flap style) ----------
function updateStats() {
  const items = filteredPrograms();
  const dual = items.filter(p => p.type === "dual").length;
  const free = items.filter(p => p.tuitionFree).length;

  setStat("stat-total", items.length);
  setStat("stat-dual", dual);
  setStat("stat-free", free);
}
function setStat(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = value;
  el.classList.remove("flipping");
  requestAnimationFrame(() => el.classList.add("flipping"));
}

// ---------- Wire up controls ----------
document.querySelectorAll(".toggle-group button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".toggle-group button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.type = btn.dataset.type;
    applyFilters();
  });
});

document.getElementById("free-only").addEventListener("change", (e) => {
  state.freeOnly = e.target.checked;
  applyFilters();
});

document.getElementById("search").addEventListener("input", (e) => {
  state.search = e.target.value;
  applyFilters();
});

// ---------- Init ----------
buildMarkers();
applyFilters();
