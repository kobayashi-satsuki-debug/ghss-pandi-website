#!/usr/bin/env bash
# Build a signed release APK without Gradle.
#
# Needs: JDK 17, Android SDK with platforms;android-34 and build-tools;34.0.0,
# and a keystore. Set JAVA_HOME and ANDROID_HOME, then run ./build-apk.sh.
#
#   KEYSTORE=path/to/ghss-pandi-release.jks KEYSTORE_PASS=... KEY_ALIAS=ghsspandi ./build-apk.sh
#
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"

JAVA_HOME="${JAVA_HOME:?set JAVA_HOME to a JDK 17}"
ANDROID_HOME="${ANDROID_HOME:?set ANDROID_HOME to the Android SDK}"
BUILD_TOOLS="${BUILD_TOOLS:-$ANDROID_HOME/build-tools/34.0.0}"
PLATFORM="$ANDROID_HOME/platforms/android-34/android.jar"

KEYSTORE="${KEYSTORE:-$HERE/.keystore/ghss-pandi-release.jks}"
KEYSTORE_PASS="${KEYSTORE_PASS:?set KEYSTORE_PASS}"
KEY_ALIAS="${KEY_ALIAS:-ghsspandi}"
VERSION_NAME="${VERSION_NAME:-1.0.0}"
VERSION_CODE="${VERSION_CODE:-1}"

APP="$HERE/app/src/main"
OUT="$HERE/build"
ASSETS="$APP/assets/www"
APK_NAME="GHSS-PANDI-$VERSION_NAME.apk"

rm -rf "$OUT"
mkdir -p "$OUT/res" "$OUT/classes" "$OUT/dex"

echo "==> copying the website into assets"
rm -rf "$ASSETS"
mkdir -p "$ASSETS"
( cd "$ROOT" && cp -R --parents *.html css js assets "$ASSETS" )
rm -f "$ASSETS"/_headers "$ASSETS"/CNAME

echo "==> manifest with the package name"
mkdir -p "$OUT/manifest"
sed 's|<manifest xmlns:android="http://schemas.android.com/apk/res/android">|<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="in.ghsspandi.app">|' \
  "$APP/AndroidManifest.xml" > "$OUT/manifest/AndroidManifest.xml"

echo "==> compiling resources"
"$BUILD_TOOLS/aapt2" compile --dir "$APP/res" -o "$OUT/res/resources.zip"

echo "==> linking resources and assets"
"$BUILD_TOOLS/aapt2" link \
  -o "$OUT/base.apk" \
  -I "$PLATFORM" \
  --manifest "$OUT/manifest/AndroidManifest.xml" \
  -R "$OUT/res/resources.zip" \
  -A "$APP/assets" \
  --auto-add-overlay \
  --min-sdk-version 24 \
  --target-sdk-version 34 \
  --version-code "$VERSION_CODE" \
  --version-name "$VERSION_NAME"

echo "==> compiling java"
"$JAVA_HOME/bin/javac" --release 8 -Xlint:-options \
  -classpath "$PLATFORM" \
  -d "$OUT/classes" \
  $(find "$APP/java" -name '*.java')

echo "==> dexing"
"$BUILD_TOOLS/d8" --release --min-api 24 --lib "$PLATFORM" \
  --output "$OUT/dex" $(find "$OUT/classes" -name '*.class')

echo "==> packaging"
cp "$OUT/base.apk" "$OUT/unsigned.apk"
python3 - "$OUT/unsigned.apk" "$OUT/dex/classes.dex" <<'PY'
import sys, zipfile
apk, dex = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(apk, 'a', zipfile.ZIP_DEFLATED) as z:
    z.write(dex, 'classes.dex')
print('added classes.dex')
PY

echo "==> aligning"
"$BUILD_TOOLS/zipalign" -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"

echo "==> signing"
"$BUILD_TOOLS/apksigner" sign \
  --ks "$KEYSTORE" \
  --ks-key-alias "$KEY_ALIAS" \
  --ks-pass "pass:$KEYSTORE_PASS" \
  --key-pass "pass:$KEYSTORE_PASS" \
  --out "$OUT/$APK_NAME" \
  "$OUT/aligned.apk"

"$BUILD_TOOLS/apksigner" verify --print-certs "$OUT/$APK_NAME" | head -5
rm -f "$OUT/unsigned.apk" "$OUT/aligned.apk" "$OUT/base.apk"

echo "==> done: $OUT/$APK_NAME"
ls -lh "$OUT/$APK_NAME"
