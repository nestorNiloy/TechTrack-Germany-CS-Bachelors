# Germany CS Bachelor Map

Interactive map comparing CS bachelor programs in Germany — both
**dual-study** (Ausbildung + degree) and **full-time** — with tuition,
job-market tier, and nearest-big-city travel times to help with
program shortlisting.

No backend, no build step. Pure HTML/CSS/JS + Leaflet.js. Deploys free
on GitHub Pages.

## Files

| File        | Purpose                                             |
|-------------|------------------------------------------------------|
| `index.html`| Page shell, loads Leaflet + fonts + scripts          |
| `data.js`   | The dataset — one object per program (see schema)    |
| `app.js`    | Map rendering, filters, list sync, popups, watchlist |
| `style.css` | Departure-board visual design                        |

## Adding real programs

Edit `data.js`. Each entry:

```js
{
  id: "unique-slug",
  university: "Name",
  program: "Official program title (B.Sc.)",
  city: "City",
  lat: 00.0000, lng: 00.0000,       // decimal degrees
  type: "dual" | "fulltime",
  company: "Partner company" | null,
  tuitionFree: true | false,
  tuitionPerSem: 000 | null,         // EUR, null if free
  language: "German" | "English" | "German/English",
  reputation: "top" | "good" | "reasonable",
  jobMarket: "high" | "medium" | "low",
  website: "https://...",            // course page link, used in popup
  nearestCities: [
    { name: "City", distanceKm: 00, travelMinHbf: 00 }
    // 2–3 entries, ordered nearest first
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

Just open `index.html` in a browser — no server needed. (If your
browser blocks local `file://` script loading, run any static server,
e.g. `npx serve .` from this folder.)

## Deploying to GitHub Pages

1. Create a new repo, e.g. `yourname.github.io` (or any repo name).
2. Push these four files to the repo root (or to `/docs` if you prefer
   and set that as the Pages source).
3. Repo → Settings → Pages → set source to the branch/folder above.
4. Site goes live at `https://yourname.github.io/` (or
   `https://yourname.github.io/repo-name/`).

## Roadmap ideas (good "future work" talking points)

- Auto-generate `nearestCities` travel times via a transit API instead
  of manual lookup.
- Scrape/parse a structured source (e.g. Hochschulkompass) to grow the
  dataset beyond manual entry.
- Add a comparison view for watchlisted programs side-by-side.
- Add NC (Numerus Clausus) history per program where available.
