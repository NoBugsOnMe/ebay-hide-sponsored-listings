# eBay: hide sponsored listings

A userscript that hides sponsored results on eBay search pages.

## How it works

eBay draws a "Sponsored" label on every search result as an embedded SVG image.
On sponsored listings the word is positioned inside the label area. On ordinary
listings the same word is pushed far outside it, so nothing shows. The image
data is re-randomized on every page load, so a fixed ad-blocker filter cannot
tell the two apart.

This script decodes each label image, works out where the text lands, and hides
the listing if the label would actually be visible.

## Install

1. Install a userscript manager such as [Violentmonkey](https://violentmonkey.github.io/).
2. Open the script's raw URL and confirm the install prompt:
   https://raw.githubusercontent.com/NoBugsOnMe/ebay-hide-sponsored-listings/main/ebay-hide-sponsored-listings.user.js

Updates are picked up automatically from the same URL.

## Scope

- Runs on `https://www.ebay.com/sch/*` and `https://www.ebay.com/b/*`.
- Handles results that load as you scroll.
- Requests no special permissions and makes no network requests.

## When it stops working

eBay changes its page markup from time to time. If sponsored listings reappear,
please open an issue and attach the page's HTML (in the browser's Inspector,
right-click the `<html>` line and choose Copy > Outer HTML).

## License

MIT. See [LICENSE](LICENSE).
