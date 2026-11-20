package in.ghsspandi.app;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/** Plain-JVM checks for the APK's asset routing. Run: ./test-routes.sh */
public class AssetRoutesTest {

    private static int passed;
    private static int failed;
    private static final List<String> failures = new ArrayList<>();

    public static void main(String[] args) throws Exception {
        String assetsDir = args.length > 0 ? args[0] : "app/src/main/assets/www";

        is(AssetRoutes.assetFor("/"), "www/index.html", "root serves index");
        is(AssetRoutes.assetFor(""), "www/index.html", "empty serves index");
        is(AssetRoutes.assetFor(null), "www/index.html", "null serves index");
        is(AssetRoutes.assetFor("/index.html"), "www/index.html", "page path");
        is(AssetRoutes.assetFor("/css/style.css"), "www/css/style.css", "stylesheet path");
        is(AssetRoutes.assetFor("/assets/logo.svg"), "www/assets/logo.svg", "logo path");
        is(AssetRoutes.assetFor("/js/site.js?v=2"), "www/js/site.js", "query string dropped");
        is(AssetRoutes.assetFor("/gallery/#top"), "www/gallery/index.html", "fragment dropped, dir index");
        is(AssetRoutes.assetFor("/gallery/"), "www/gallery/index.html", "trailing slash index");

        is(AssetRoutes.mime("www/index.html"), "text/html", "html mime");
        is(AssetRoutes.mime("www/css/style.css"), "text/css", "css mime");
        is(AssetRoutes.mime("www/js/site.js"), "application/javascript", "js mime");
        is(AssetRoutes.mime("www/assets/logo.svg"), "image/svg+xml", "svg mime");
        is(AssetRoutes.mime("www/assets/photo.JPG"), "image/jpeg", "jpeg mime, case insensitive");
        is(AssetRoutes.mime("www/fonts/x.woff2"), "font/woff2", "woff2 mime");
        is(AssetRoutes.mime("www/notes.pdf"), "application/pdf", "pdf mime");
        is(AssetRoutes.mime("www/blob.bin"), "application/octet-stream", "unknown mime");

        is(AssetRoutes.unsafe("/../secret"), true, "traversal blocked");
        is(AssetRoutes.unsafe("/css/../../x"), true, "nested traversal blocked");
        is(AssetRoutes.unsafe("/css/style.css"), false, "normal path allowed");

        // every page and every local file it points at must be inside the APK assets
        File root = new File(assetsDir);
        check(root.exists(), "assets folder exists: " + root.getAbsolutePath());
        String[] pages = root.list((d, n) -> n.endsWith(".html"));
        check(pages != null && pages.length >= 20, "all pages bundled (" + (pages == null ? 0 : pages.length) + ")");
        int refs = 0;
        for (String page : pages == null ? new String[0] : pages) {
            String html = new String(java.nio.file.Files.readAllBytes(new File(root, page).toPath()), "UTF-8");
            for (String ref : localRefs(html)) {
                refs++;
                File target = new File(root, ref);
                check(target.exists(), page + " -> " + ref);
            }
        }
        check(refs > 50, "local references checked (" + refs + ")");

        System.out.println(passed + " passed, " + failed + " failed");
        for (String f : failures) System.out.println("  FAIL " + f);
        if (failed > 0) System.exit(1);
    }

    private static List<String> localRefs(String html) {
        List<String> out = new ArrayList<>();
        java.util.regex.Matcher m = java.util.regex.Pattern
                .compile("(?:src|href)\\s*=\\s*[\"']([^\"'#?]+)[\"']", java.util.regex.Pattern.CASE_INSENSITIVE)
                .matcher(html);
        while (m.find()) {
            String v = m.group(1).trim();
            if (v.isEmpty() || v.startsWith("http") || v.startsWith("//") || v.startsWith("mailto:")
                    || v.startsWith("tel:") || v.startsWith("data:") || v.startsWith("javascript:")
                    || v.startsWith("/") || v.endsWith("/")) continue;
            out.add(v);
        }
        return out;
    }

    private static void is(Object actual, Object expected, String what) {
        if (expected.equals(actual)) {
            passed++;
        } else {
            failed++;
            failures.add(what + " (expected " + expected + ", got " + actual + ")");
        }
    }

    private static void check(boolean ok, String what) {
        if (ok) passed++;
        else {
            failed++;
            failures.add(what);
        }
    }
}
