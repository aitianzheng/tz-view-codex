#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKER_NAME="${CLOUDFLARE_WORKER_NAME:-tz-view}"
CUSTOM_DOMAIN="${CLOUDFLARE_CUSTOM_DOMAIN:-tz-view.com}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://${CUSTOM_DOMAIN}}"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
elif [[ -n "${1:-}" ]]; then
  echo "Usage: npm run deploy:cloudflare -- [--dry-run]" >&2
  exit 2
fi

cd "$PROJECT_DIR"

export NEXT_PUBLIC_SITE_URL="$SITE_URL"
export WRANGLER_WRITE_LOGS=false
export WRANGLER_LOG_PATH="$PROJECT_DIR/.wrangler/logs"

if [[ "$DRY_RUN" == false ]]; then
  WHOAMI_OUTPUT="$(npx --no-install wrangler whoami 2>&1 || true)"
  if [[ "$WHOAMI_OUTPUT" == *"not authenticated"* ]] || [[ "$WHOAMI_OUTPUT" == *"not logged in"* ]]; then
    echo "Cloudflare is not authenticated." >&2
    echo "Run 'npx wrangler login' once, then rerun this command." >&2
    exit 1
  fi
fi

git diff --check
npm run lint
npm run build

DEPLOY_ARGS=(
  deploy
  --config dist/server/wrangler.json
  --name "$WORKER_NAME"
  --domain "$CUSTOM_DOMAIN"
)

if [[ "$DRY_RUN" == true ]]; then
  DEPLOY_ARGS+=(--dry-run)
fi

npx --no-install wrangler "${DEPLOY_ARGS[@]}"

if [[ "$DRY_RUN" == false ]]; then
  echo "Published: https://${CUSTOM_DOMAIN}"
fi
