# All Work — cover images and repeat behavior

## Image sources

The three downloaded images are contextual / mood covers, not images of Juun's delivered design work. In particular, the gallery photograph depicts LACMA, not SeMA. Replace it with an actual project photograph when available. The six portrait SVGs are newly composed presentation artwork / illustrative UI, not verified production screenshots.

| Local asset | Author | Original page |
| --- | --- | --- |
| `assets/images/work/gallery-context.jpg` | Mike Von | https://unsplash.com/photos/inside-white-building-with-multicolored-paintings-v9-ZW3VONcw |
| `assets/images/work/glass-study.jpg` | Rick Rothenberg | https://unsplash.com/photos/a-close-up-view-of-a-green-plant-0wpMTqZRNNg |
| `assets/images/work/orange-study.jpg` | Tasha Kostyuk | https://unsplash.com/photos/abstract-3d-render-featuring-orange-shapes-and-a-red-sphere-s_yJmYW71Q8 |

All three source pages explicitly identify the free Unsplash License, not Unsplash+. Source checked 2026-09-21. License: https://unsplash.com/license . Photographer credit is retained here. The license covers the photograph; it does not imply ownership of depicted artwork, endorsement, or authorship of the render.

## Palette

- Main background / paper: `#f1ede8`, matching the main page.
- Edge atmosphere: `#e6e3db`, with a quiet green cylindrical grid.
- Signature green / text / solid boundary circle: `#0c3024`.
- Spatial depth comes from perspective, overlapping planes and subtle ivory distance fog, rather than a separate dark theme.
- Muted sage detail: `#b3c1a8`
- Covers introduce warm ivory, restrained orange and mineral gray rather than applying a green tint to every image.

## Continuous sequence

- The content cycle has `N + 1` slots: N projects followed by one END / START marker.
- Each occurrence owns an absolute sequence number. Its image and link match the original project.
- Per-slot rise derives from the displayed card height. Cycle height is `(N + 1) × rise`.
- Camera depth, viewport height and complete panel height determine the visible vertical extent. An overscan interval is added before creating copies.
- New occurrences enter outside that interval. Old occurrences are removed only outside it. No visible card is moved to the beginning.
- The focused card height is constrained to the viewport after reserving header, caption and footer space. More projects change cycle length automatically.
- Cards are rigid; scroll deformation and idle warping are intentionally absent.
- Front cards smoothly grow up to 16%; viewport fitting includes this maximum scale.
- Per-slot rise is 40% of panel height (minimum .36 world units), tightening the helix without changing cycle order.
- Forward scroll and idle travel both move upward along a reversed winding. No per-card snap, center slowdown, or hover stop. Reduced-motion preferences and keyboard reading focus remain protected.
- The solid circle has two physical faces: START on its front and END on its reverse. No arrow or secondary marker text.
