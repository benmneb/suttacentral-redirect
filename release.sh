#!/usr/bin/env bash
# Zip both extensions and submit them to the Chrome Web Store and Firefox Add-ons.
# Store credentials are read from .env.submit (see .env.submit.example).
#
# Usage: ./release.sh [--dry-run] [--allow-dirty] [other publish-extension flags]

set -euo pipefail
cd "$(dirname "$0")"

allow_dirty=false
args=()
for arg in "$@"; do
	case "$arg" in
		--allow-dirty) allow_dirty=true ;;
		--dry-run) allow_dirty=true; args+=("$arg") ;;
		*) args+=("$arg") ;;
	esac
done

version_of() {
	sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$1/manifest.json"
}

version=$(version_of chromium)
if [[ "$version" != "$(version_of gecko)" ]]; then
	echo "Version mismatch: chromium is $version, gecko is $(version_of gecko)" >&2
	exit 1
fi

if [[ "$allow_dirty" != true && -n "$(git status --porcelain)" ]]; then
	echo "Working tree has uncommitted changes. Commit them or pass --allow-dirty." >&2
	exit 1
fi

chrome_zip="dist/suttacentral-redirect-chromium-$version.zip"
firefox_zip="dist/suttacentral-redirect-firefox-$version.zip"

rm -rf dist && mkdir dist
(cd chromium && zip -qrX "../$chrome_zip" . -x '.*' '_metadata/*')
(cd gecko && zip -qrX "../$firefox_zip" . -x '.*' '_metadata/*')
echo "Built $chrome_zip and $firefox_zip"

npx --yes publish-browser-extension@6.1.1 \
	--chrome-zip "$chrome_zip" \
	--chrome-api-version v2 \
	--chrome-extension-id noaddajdfegpjfgpmbhcbahofgkceaan \
	--firefox-zip "$firefox_zip" \
	--firefox-extension-id @suttacentral-redirect \
	${args[@]+"${args[@]}"}
