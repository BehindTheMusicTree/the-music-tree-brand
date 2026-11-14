# Radial identity proposals

Open `index.html` for the reference and Hear, Grow and Behind treatments at large and favicon sizes. Approved by the user on 2026-11-14; integrated into the published marks and favicon sources.

The original `logo7-sans-cercle2.png` is preserved as `the-music-tree-reference.png` (946 × 954, with alpha). Grow’s primary mark is an unchanged copy of the color reference. Its white treatment is retained as a separate variant. Each SVG embeds that same PNG as an alpha mask: the original silhouette, orientation and central opening remain unchanged. These SVGs contain raster masks, not traced vector paths, and retain the source resolution limit.

Hear uses white branches on a blue disc (#0099F5); Grow uses the reference colors on transparency, with white branches as an alternate variant; Behind uses dark branches (#171717) on a white disc. Badge variants enlarge the tree to the disc edge and clip the branches to its circular boundary. Audiometa and The Music Deck keep their separate identities.

Initial built-in imagegen prompts requested recoloring the reference white on a blue disc (Hear), white on transparency (Grow), and near-black on a white disc (Behind), preserving branch topology, orientation and central opening, without text, decoration or texture. Generated previews exhibited transparency artifacts and were discarded. The comparison uses deterministic SVG masks instead.

Production sources live in `packages/brand/src/marks`; the asset catalog generates the favicon bundles from them.
