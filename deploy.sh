#!/bin/bash
# Deploy dp-site to /var/www/dp-site
# Run this script from the dp-site directory, or from the server directly.
#
# First-time setup:
#   1. sudo mkdir -p /var/www/dp-site
#   2. sudo chown $USER:$USER /var/www/dp-site
#   3. Copy nginx.conf.example → /etc/nginx/sites-available/digitalpathology.co.kr
#   4. sudo ln -s /etc/nginx/sites-available/digitalpathology.co.kr /etc/nginx/sites-enabled/
#   5. sudo nginx -t && sudo systemctl reload nginx
#   6. sudo certbot --nginx -d digitalpathology.co.kr -d www.digitalpathology.co.kr
#   7. Then run this script for all future deploys.

set -e

DEST="/var/www/dp-site"

echo "==> Syncing files to $DEST..."
rsync -av --delete \
  --exclude 'deploy.sh' \
  --exclude 'nginx.conf.example' \
  --exclude '.git' \
  "$(dirname "$0")/" "$DEST/"

echo "==> Deploy complete! Site live at https://digitalpathology.co.kr"
