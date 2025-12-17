[![SourceHut](https://img.shields.io/badge/-SourceHut-212529?logo=sourcehut&style=flat-square)](https://git.sr.ht/~benmneb/suttacentral-redirect)
[![Codeberg](https://img.shields.io/badge/-Codeberg-4793cc.svg?logo=codeberg&logoColor=white&style=flat-square)](https://codeberg.org/benmneb/suttacentral-redirect)
[![GitHub](https://img.shields.io/badge/-GitHub-010409.svg?logo=github&style=flat-square)](https://github.com/benmneb/suttacentral-redirect)

# SuttaCentral Redirect

A simple browser extension to switch between suttacentral.net and suttacentral.express, with optional auto-redirect.

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/noaddajdfegpjfgpmbhcbahofgkceaan?style=for-the-badge&logo=googlechrome)](https://chromewebstore.google.com/detail/noaddajdfegpjfgpmbhcbahofgkceaan)
[![Mozilla Add-on Version](https://img.shields.io/amo/v/suttacentral-redirect?style=for-the-badge&logo=firefox)](https://addons.mozilla.org/firefox/addon/suttacentral-redirect/)

## Features

- Auto-redirect from .net to .express (optional, disabled by default)
- Manual toggle button to easily switch between sites
- Preserves full URL path, query parameters, and hash fragments
- Works on Firefox, Chrome, Edge, Brave, and other Chromium-based browsers

## Private & Secure

- **No data collection**: This extension does not collect, store, or transmit any user data
- **No analytics**: No tracking, no telemetry, or external connections at all
- **No third-party services**: All code runs locally in your browser
- **Minimal permissions**: Only requests access to SuttaCentral domains
- **Open source**: All code is auditable

## Usage

1. Click the extension icon in your browser toolbar
2. Check "Redirect .net → .express automatically" to enable auto-redirect
3. Use "Switch to .express" or "Switch to .net" button for manual redirects
4. The button is only enabled when on a SuttaCentral site

## Installation

### From Add-on Stores

**Firefox Add-ons**

- Visit [Firefox Add-ons Store](https://addons.mozilla.org/firefox/addon/suttacentral-redirect/)
- Click "Add to Firefox"

**Chrome Web Store**

- Visit [Chrome Web Store](https://chromewebstore.google.com/detail/noaddajdfegpjfgpmbhcbahofgkceaan)
- Click "Add to Chrome"
- Also works for Edge, Brave, Opera, and other Chromium browsers

### Manual Installation (Development)

#### Chrome/Edge/Brave

1. Download or clone this repository
1. Open `chrome://extensions/`
1. Enable "Developer mode" (toggle in top-right)
1. Click "Load unpacked"
1. Select the extension folder

#### Firefox

1. Download or clone this repository
1. Open `about:debugging#/runtime/this-firefox`
1. Click "Load Temporary Add-on"
1. Select `manifest.json` from the extension folder

**Note**: Temporary add-ons in Firefox are removed when you close the browser. For permanent installation, you need to either:

- Install from Firefox Add-ons Store
- Sign the extension through [addons.mozilla.org](https://addons.mozilla.org/developers/)

## License

[AGPL3+](https://www.gnu.org/licenses/agpl-3.0.txt). The logo is from [thesunshade](https://github.com/thesunshade/citation-helper) 🙏
