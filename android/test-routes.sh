#!/usr/bin/env bash
# Compiles AssetRoutes with the test and runs it on a plain JVM (no device needed).
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
JAVA_HOME="${JAVA_HOME:?set JAVA_HOME}"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT
"$JAVA_HOME/bin/javac" --release 8 -Xlint:-options -d "$OUT" \
  "$HERE/app/src/main/java/in/ghsspandi/app/AssetRoutes.java" \
  "$HERE/test/AssetRoutesTest.java"
"$JAVA_HOME/bin/java" -cp "$OUT" in.ghsspandi.app.AssetRoutesTest "$HERE/app/src/main/assets/www"
