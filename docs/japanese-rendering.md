# Japanese rendering stability research

## Verified sources

[1] MDN `FontFaceSet.load()` states that `document.fonts.load(font, text)` forces the requested font faces to load and returns a Promise fulfilled when those fonts are loaded: https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load

[2] MDN `FontFaceSet.ready` states that the Promise resolves only after document fonts and layout operations are complete and no further font loads are needed: https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready

[3] web.dev explains that web fonts can delay text rendering and cause layout shifts when fallback and web-font metrics differ. It recommends early discovery, careful preload use, preconnect, WOFF2/subsetting, and special care for CJK font payloads: https://web.dev/articles/font-best-practices

## Engineering decision

The language switch must be an atomic commit. Keep the currently committed language visible while the target dictionary is already in the inline bundle and the target glyph-bearing font is ready. Then synchronously set `html.lang`, replace all eligible `data-i18n` nodes, update language-button state, and resync indicators in one commit. A stale request token prevents a slower Japanese request from overwriting a newer selection. The initial document stays pending until the first language commit completes, preventing a half-translated first paint.

## Failure prevention

Do not update `html.lang` before the target font is ready, because language-dependent CSS and font fallback can reflow the page before text is complete. Do not hide or re-render the page for every language switch; only the initial first paint is gated. Do not preload a font without also calling `document.fonts.load()` for the actual Japanese sample text. Verify both initial `localStorage=ja` and every pairwise language transition, including header/sidebar geometry.
