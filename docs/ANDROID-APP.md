# GHSS Pandi Android app

The APK in `download/` is the whole website in a WebView shell, built from this
repository. It is not a second code base: every page, stylesheet and script in
the root of the repo is copied into `android/app/src/main/assets/www/` at build
time, so a change to the website reaches the app the next time it is built.

- Package `in.ghsspandi.app`, version `1.0.0` (versionCode 1)
- Android 7.0 (API 24) and newer, target API 34
- About 744 KB, no third-party libraries, no ads, no analytics
- Signed with the school's own key (APK Signature Scheme v2 + v3)

## What the shell does

| Piece | Behaviour |
| --- | --- |
| Origin | The site is served from `https://appassets.androidplatform.net/`, a real https origin, so `localStorage`, `crypto.subtle` and the Supabase client behave exactly as on the web |
| Navigation | Links inside the app stay in the app; anything else (mail, phone, Drive, GitHub, YouTube) opens in the phone's browser or dialler |
| Back button | Goes back through the page history, then leaves the app |
| File upload | `input type=file` (gallery photos) opens the Android file picker |
| Downloads | A PDF or other file link is handed to the browser/Download Manager |
| Offline | The pages themselves always load from the APK; only the live data (results, chat, notices) needs the network |

## Building it

You need JDK 17 and the Android SDK with `platforms;android-34` and
`build-tools;34.0.0`. No Gradle is required — `android/build-apk.sh` drives
`aapt2`, `javac`, `d8`, `zipalign` and `apksigner` directly.

```bash
export JAVA_HOME=/path/to/jdk-17
export ANDROID_HOME=/path/to/android-sdk
export KEYSTORE_PASS='the password from android/.keystore/README.txt'
cd android
./build-apk.sh
# -> android/build/GHSS-PANDI-1.0.0.apk
cp build/GHSS-PANDI-1.0.0.apk ../download/
```

`android/app/build.gradle` and `settings.gradle` are there for Android Studio:
open the `android/` folder, and the `copyWebAssets` task copies the site into
the APK before every build. Android Studio signs with the debug key, so use the
script for the APK you publish.

### Tests

```bash
cd android && JAVA_HOME=/path/to/jdk-17 ./test-routes.sh
```

350 checks: asset path routing, MIME types, path-traversal blocking, and every
local `src`/`href` in every page resolving to a file that is really inside the
APK.

## The signing key

`android/.keystore/ghss-pandi-release.jks`, alias `ghsspandi`. It is git-ignored
on purpose: a signing key in a public repository lets anyone publish an update
that phones will accept as the school's.

**Back this file up.** Android only installs an update over an existing app when
the signature matches. Lose the key and every phone has to uninstall the old app
before it can install a new one. The password is in
`android/.keystore/README.txt`; keep both in the school office, not in this repo.

Certificate fingerprint (SHA-256), for checking a build is really ours:

```
119025B4D634CDF939233D5A9565DFF2D361A0500B69958E71F0038A1A23DBE4
```

## Publishing a new version

1. Raise `versionCode` and `versionName` in `android/build-apk.sh`
   (`VERSION_CODE=2 VERSION_NAME=1.0.1 ./build-apk.sh`).
2. Copy the APK to `download/` and update the link and size on `app.html`.
3. Commit the APK, the page and the version bump, then push to `main` so GitHub
   Pages serves it.
4. Optionally attach the same file to a GitHub release on
   `kobayashi-satsuki-debug/GHSS-PANDI-app`, and replace the Google Drive copy.

## Known limits

- A sign-in email sent from inside the app opens the website in the browser,
  because Supabase redirects to the site URL. Signing in with the six-digit code
  inside the app works normally.
- Android shows "install unknown apps" and Play Protect warnings for any APK
  that does not come from the Play Store. That is expected, not a fault.
- The app is a WebView, so a phone with a very old WebView (Android 7 without
  updates) may not render `backdrop-filter`; the stylesheet falls back to solid
  cards.
