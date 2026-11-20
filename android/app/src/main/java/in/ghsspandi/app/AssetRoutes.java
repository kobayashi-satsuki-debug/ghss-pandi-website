package in.ghsspandi.app;

/** Path and MIME rules for the bundled site. No Android types, so it is testable on a plain JVM. */
final class AssetRoutes {

    private AssetRoutes() {
    }

    /** Maps a request path such as "/css/style.css" to an asset name under assets/. */
    static String assetFor(String path) {
        if (path == null || path.isEmpty() || path.equals("/")) return "www/index.html";
        String clean = path;
        int q = clean.indexOf('?');
        if (q >= 0) clean = clean.substring(0, q);
        int h = clean.indexOf('#');
        if (h >= 0) clean = clean.substring(0, h);
        if (clean.endsWith("/")) clean = clean + "index.html";
        return "www" + clean;
    }

    static String mime(String name) {
        String n = name.toLowerCase();
        if (n.endsWith(".html") || n.endsWith(".htm")) return "text/html";
        if (n.endsWith(".css")) return "text/css";
        if (n.endsWith(".js") || n.endsWith(".mjs")) return "application/javascript";
        if (n.endsWith(".json") || n.endsWith(".webmanifest")) return "application/json";
        if (n.endsWith(".svg")) return "image/svg+xml";
        if (n.endsWith(".png")) return "image/png";
        if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "image/jpeg";
        if (n.endsWith(".webp")) return "image/webp";
        if (n.endsWith(".gif")) return "image/gif";
        if (n.endsWith(".ico")) return "image/x-icon";
        if (n.endsWith(".woff2")) return "font/woff2";
        if (n.endsWith(".woff")) return "font/woff";
        if (n.endsWith(".ttf")) return "font/ttf";
        if (n.endsWith(".pdf")) return "application/pdf";
        if (n.endsWith(".mp4")) return "video/mp4";
        if (n.endsWith(".txt") || n.endsWith(".md")) return "text/plain";
        return "application/octet-stream";
    }

    /** True when a path must not be served, e.g. a traversal attempt. */
    static boolean unsafe(String path) {
        if (path == null) return true;
        String p = path.replace('\\', '/');
        return p.contains("..") || p.startsWith("//");
    }
}
