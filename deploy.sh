#!/usr/bin/env bash
set -euo pipefail

# Deploy dp-site static files to /var/www/dp-site.
# Run this script from the repo directory on the server.

DEST="/var/www/dp-site"
SRC_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Syncing files to ${DEST}..."
rsync -av --delete \
  --exclude "deploy.sh" \
  --exclude "nginx.conf.example" \
  --exclude ".git" \
  "${SRC_DIR}/" "${DEST}/"

echo "==> Deploy complete."
