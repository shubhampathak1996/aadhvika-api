#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo ""
echo "🚀 =========================================="
echo "   Aadhvika API - Local Build & Deploy Tool"
echo "=========================================="
echo ""

# 1. Check if git repository
if [ ! -d ".git" ]; then
  echo "❌ Error: Not a git repository!"
  exit 1
fi

# Get current git branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📌 Current Git Branch: $BRANCH"

# 2. Clean previous build
echo "🧹 Cleaning previous build directory (dist/)..."
rm -rf dist

# 3. Build project
echo "📦 Running TypeScript compiler (npm run build)..."
npm run build

# Verify build output
if [ ! -d "dist" ] || [ ! -f "dist/server.js" ]; then
  echo "❌ Error: Build failed! dist/server.js was not generated."
  exit 1
fi

echo "✅ Build completed successfully!"

# 4. Commit Message
COMMIT_MSG="$1"
if [ -z "$COMMIT_MSG" ]; then
  if [ -t 0 ]; then
    read -rp "💬 Enter commit message (leave blank for default): " INPUT_MSG
    if [ -n "$INPUT_MSG" ]; then
      COMMIT_MSG="$INPUT_MSG"
    fi
  fi
fi

if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="Build & deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 5. Git Stage & Commit
echo "📝 Staging all changes including dist/..."
git add -A

if git diff --cached --quiet; then
  echo "ℹ️ No changes to commit."
else
  echo "💾 Committing changes with message: '$COMMIT_MSG'"
  git commit -m "$COMMIT_MSG"
fi

# 6. Git Push
echo "⬆️ Pushing changes to origin $BRANCH..."
git push origin "$BRANCH"

echo ""
echo "=========================================================="
echo "🎉 Build & Push successful to branch '$BRANCH'!"
echo "=========================================================="
echo "👉 Now login to your server and run:"
echo "   git pull"
echo "   pm2 reload aadhvika-api"
echo "=========================================================="
echo ""
