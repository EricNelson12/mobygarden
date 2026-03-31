#!/usr/bin/env bash
# Convert photos to WebP at ~500px wide
# Usage: ./scripts/convert-photos.sh [input_dir] [output_dir]
#   input_dir  defaults to ./photos
#   output_dir defaults to ./public/photos

set -euo pipefail

INPUT_DIR="${1:-./photos}"
OUTPUT_DIR="${2:-./photos/converted}"
WIDTH=500

if ! command -v magick &>/dev/null; then
  echo "ImageMagick not found. Install with: brew install imagemagick"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

shopt -s nullglob
files=("$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,mp.jpg,MP.jpg})

if [ ${#files[@]} -eq 0 ]; then
  echo "No image files found in $INPUT_DIR"
  exit 0
fi

for src in "${files[@]}"; do
  filename=$(basename "$src")
  # Strip all extensions and add .webp
  base="${filename%%.*}"
  dest="$OUTPUT_DIR/${base}.webp"

  echo "Converting $filename -> ${base}.webp"
  magick "$src" -resize "${WIDTH}>" -quality 82 "$dest"
done

echo "Done. Output in $OUTPUT_DIR"
