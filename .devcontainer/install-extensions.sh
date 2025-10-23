#!/usr/bin/env bash
# Install exact VS Code extensions from .vscode/extensions-list.txt if possible.
# This runs inside the dev container after creation. `code` CLI may not be available
# in all environments; the script will attempt to use it and otherwise print instructions.

set -euo pipefail

REPO_ROOT="$(pwd)"
EXT_FILE="$REPO_ROOT/.vscode/extensions-list.txt"

if [ ! -f "$EXT_FILE" ]; then
  echo "No .vscode/extensions-list.txt found; skipping extension auto-install."
  exit 0
fi

echo "Found extension list at $EXT_FILE"

if command -v code >/dev/null 2>&1; then
  echo "Installing extensions via 'code' CLI..."
  while IFS= read -r ext; do
    if [ -n "$ext" ]; then
      echo " -> Installing $ext"
      code --install-extension "$ext" --force || true
    fi
  done < "$EXT_FILE"
  echo "Extensions install attempted."
else
  echo "Warning: 'code' CLI not available inside the container."
  echo "You can install extensions manually from the Extensions view in VS Code,"
  echo "or ensure Codespaces applies the extensions listed in devcontainer.json customizations."
fi

# Return success so postCreateCommand continues
exit 0
