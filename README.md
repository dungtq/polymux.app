# polymux.app

The website for [polymux](https://github.com/dungtq/polymux), a self-hosted web control plane for your coding
agents, tmux sessions and servers. Live at <https://polymux.app>.

Plain static HTML, CSS and a little vanilla JS. No build step, no framework, no external hosts (no CDNs, web
fonts or analytics).

## Layout

| Path | What |
|---|---|
| `docs/index.html` | Landing page |
| `docs/screenshots.html` | Screenshot gallery (click a shot to zoom) |
| `docs/404.html` | Not-found page (self-contained styles) |
| `docs/assets/base.css`, `page.css` | Styles; colours follow polymux's `dt` theme, light and dark |
| `docs/assets/head.js` | Applies the saved light/dark choice before first paint |
| `docs/assets/site.js` | Theme toggle, active section in the nav, copy button |
| `docs/assets/lightbox.js` | Zoom viewer for screenshots |
| `docs/assets/shots/` | Screenshots (fixture data from polymux's dev instance, never a real host) |
| `docs/CNAME`, `docs/.nojekyll` | GitHub Pages custom domain; serve files as they are |

## Preview locally

```sh
python3 -m http.server -d docs 8000
```

Open <http://127.0.0.1:8000>. All paths are relative, so the site also works from a sub-path.

## Deploy

GitHub Pages serves `main` from `/docs` at `polymux.app`. Push to `main` and Pages rebuilds.

## Screenshots

Taken with polymux's own tools on a dev instance with fixture data (`tools/devpm.py`, `tools/uishot.py` in the
polymux repo): desktop in Chromium, iPhone in real WebKit, light and dark. Keep the file names when you replace
one; the pages reference them by name.

## Contributing

Fixes to wording, layout or accessibility are welcome. Keep it fast: no external requests, no build step, each
CSS/JS file under 500 lines. Check light and dark, desktop and phone width (no horizontal scroll) before a PR.
Issues about polymux itself go to [dungtq/polymux](https://github.com/dungtq/polymux/issues).
