Brand logos — add the real files here
=====================================

The sidebar header shows the Wipro logo (LEFT) and the Anthropic logo (RIGHT).

No logo files ship with the app (only this README), so until you add them the
header shows a plain text fallback ("Wipro" / "Anthropic"). Drop the official
brand artwork in this folder to show the real logos:

  wipro.svg       (or wipro.png / wipro.webp / wipro.jpg)
  anthropic.svg   (or anthropic.png / anthropic.webp / anthropic.jpg)

The header auto-detects the format — it tries .svg, then .png, then .webp,
then .jpg, then the text fallback. So you can drop in ANY of those formats
with NO code change; just keep the base name exactly `wipro` / `anthropic`.

Where to get the OFFICIAL logos:
  - Wipro:     your Wipro brand portal (brand.wipro.com) — request the master logo.
  - Anthropic: Anthropic's brand/press assets.

Fit tips:
  - Prefer SVG (crisp at any size), transparent background.
  - The Wipro slot renders ~28px tall, Anthropic ~20px tall (width auto).
  - A version that reads on a light background is best (sidebar is light by default).

After copying the files here, refresh the browser (Ctrl+Shift+R). Done.
