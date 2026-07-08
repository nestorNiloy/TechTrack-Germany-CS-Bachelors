# 🗺️ Germany CS Bachelor Map

An interactive, zero-overhead geospatial exploration tool built to map, filter, and compare Computer Science bachelor programs across Germany. Designed to help prospective students navigate and shortlist dual-study and full-time tracks based on tuition structures, language requirements, and real-world regional transit times.

👉 **[Live Interactive Map]** (https://nestorniloy.github.io/TechTrack-Germany-CS-Bachelors/)

---

## ⚡ Key Features

*   **Dual-Perspective Mapping:** Toggle seamlessly between **Dual-Study** (Ausbildung + degree) and **Full-Time** tracks with localized color coding.
*   **Transit-Proximity Matrix:** Features a built-in travel metric calculating rough train durations from regional campuses straight to major city Central Stations (`Hauptbahnhof`).
*   **Zero-Overhead Architecture:** No framework, no build steps, and no backend overhead. Pure web-standard stack that boots instantly.
*   **Live Dashboard Metrics:** Implements an animated, split-flap style scoreboard displaying real-time filtered totals for matched programs, dual-study availability, and tuition-free options.
*   **Client-Side Persistence:** Integrated watchlist management utilizing the `HTML5 LocalStorage API` to preserve your shortlisted programs across sessions without a database.

---

## 🛠️ Tech Stack & Architecture

*   **Frontend UI:** Vanilla HTML5, CSS3 (Custom properties, CSS Grid, Flexbox, Keyframe animations).
*   **Geospatial Rendering:** Leaflet.js mapped over lightweight, high-performance CartoDB Dark Matter tile assets.
*   **State Management:** Lightweight unified state-controller pattern written in pure vanilla JavaScript.

No backend, no build step. Pure HTML/CSS/JS + Leaflet.js. Deploys free
on GitHub Pages.

## Files

| File        | Purpose                                             |
|-------------|------------------------------------------------------|
| `index.html`| Page shell, loads Leaflet + fonts + scripts          |
| `data.js`   | The dataset — one object per program (see schema)    |
| `app.js`    | Map rendering, filters, list sync, popups, watchlist |
| `style.css` | Departure-board visual design                        |

---

## 📊 Extensible Data Schema

The dataset lives entirely in `data.js` under a highly structural JSON schema. Each university profile encapsulates 14 data vectors:

```javascript
{
  id: "th-rosenheim-aai",
  university: "TH Rosenheim",
  program: "Applied Artificial Intelligence (B.Sc.)",
  city: "Rosenheim",
  lat: 47.8561, lng: 12.1281,       // Coordinates for precise mapping
  type: "dual",                     // "dual" | "fulltime"
  company: "Practical placement",   // Associated partner company if applicable
  tuitionFree: true,
  tuitionPerSem: null,              // Cost in EUR per semester
  language: "English",
  reputation: "good",
  jobMarket: "high",
  website: "https://...",            // Link directly to official course syllabus
  nearestCities: [                  // Ordered by closest proximity
    { name: "Munich", distanceKm: 55, travelMinHbf: 45 }
  ]
}
```

**Finding lat/lng:** right-click the location on Google Maps → click
the coordinates to copy them.

**Finding nearestCities travel times:** use [bahn.de](https://www.bahn.de)
or [DB Navigator] to look up a typical off-peak train time from the
campus's nearest station to that city's Hauptbahnhof. `distanceKm` can
be straight-line (Google Maps "measure distance") — it's a rough
proximity indicator, not the travel route.

Removing the `SAMPLE` placeholder entries: delete or overwrite the six
objects currently in `data.js` once you have verified data.

## Running locally

Because this project utilizes ES modules and external map assets cleanly, you can run it instantly without a local compilation server:

- Clone the repository.
- Open index.html directly in any web browser.
(Note: If your local browser configurations restrict file:// execution protocols, spin up a quick static wrapper via npx serve .)

## Deploying to GitHub Pages

1. Create a new repo, e.g. `yourname.github.io` (or any repo name).
2. Push these four files to the repo root (or to `/docs` if you prefer
   and set that as the Pages source).
3. Repo → Settings → Pages → set source to the branch/folder above.
4. Site goes live at `https://yourname.github.io/` (or
   `https://yourname.github.io/repo-name/`).

## Scopes for future improvements

- Automated Transit Verification: Replace manual route estimations by querying live Deutsche Bahn schedule structures via an open-source transit API.

- Program Scraper Integration: Build a structural parser script targeting centralized indices (like Hochschulkompass) to scale the database dynamically beyond 100+ programs.

- Side-by-Side Comparison Grid: Implement an expandable matrix layout overlay allowing users to compare selected watchlist items side-by-side across all variables.

- Historical NC Analytics: Integrate a field track mapping past Numerus Clausus (admission grade cutoff) requirements per university.
