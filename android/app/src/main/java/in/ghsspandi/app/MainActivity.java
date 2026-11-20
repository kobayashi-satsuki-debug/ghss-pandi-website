package in.ghsspandi.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * GHSS Pandi app shell.
 *
 * The whole website ships inside the APK and is served from an https origin
 * (appassets.androidplatform.net) so localStorage, crypto.subtle and the
 * Supabase client all behave exactly as they do on the web. Anything that
 * leaves that origin is handed to the browser, mail or dialler.
 */
public class MainActivity extends Activity {

    private static final String HOST = "appassets.androidplatform.net";
    private static final String BASE = "https://" + HOST + "/";
    private static final int FILE_CHOOSER = 1001;

    private WebView web;
    private ValueCallback<Uri[]> filePathCallback;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);

        web = new WebView(this);
        web.setBackgroundColor(0xFFFFFDF6);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setSupportMultipleWindows(false);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setUserAgentString(s.getUserAgentString() + " GHSSPandiApp/1.0");

        CookieManager.getInstance().setAcceptCookie(true);
        CookieManager.getInstance().setAcceptThirdPartyCookies(web, true);

        web.setWebViewClient(new ShellClient());
        web.setWebChromeClient(new ShellChrome());
        web.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition,
                                        String mimeType, long contentLength) {
                if (url != null && url.startsWith(BASE)) return;
                openOutside(Uri.parse(url));
            }
        });

        if (state != null) {
            web.restoreState(state);
        } else {
            web.loadUrl(BASE + "index.html");
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    @Override
    protected void onActivityResult(int request, int result, Intent data) {
        if (request == FILE_CHOOSER) {
            if (filePathCallback != null) {
                filePathCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(result, data));
                filePathCallback = null;
            }
            return;
        }
        super.onActivityResult(request, result, data);
    }

    private void openOutside(Uri uri) {
        if (uri == null) return;
        String scheme = uri.getScheme();
        if (scheme == null) return;
        if (scheme.equals("http") || scheme.equals("https") || scheme.equals("mailto")
                || scheme.equals("tel") || scheme.equals("sms")) {
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, uri));
            } catch (ActivityNotFoundException ignored) {
            }
        }
    }

    private class ShellClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            Uri uri = request.getUrl();
            if (HOST.equals(uri.getHost())) return false;
            openOutside(uri);
            return true;
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            if (!HOST.equals(request.getUrl().getHost())) return null;
            return serve(request.getUrl());
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            super.onPageFinished(view, url);
            view.setVisibility(View.VISIBLE);
        }
    }

    private WebResourceResponse serve(Uri uri) {
        String path = uri.getPath();
        if (AssetRoutes.unsafe(path)) {
            return new WebResourceResponse("text/plain", "utf-8", 403, "Forbidden",
                    headers(null), new ByteArrayInputStream("Forbidden".getBytes()));
        }
        String asset = AssetRoutes.assetFor(path);
        try {
            InputStream in = getAssets().open(asset);
            return new WebResourceResponse(AssetRoutes.mime(asset), null, 200, "OK", headers(asset), in);
        } catch (IOException missing) {
            byte[] body = "Not found".getBytes();
            return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found",
                    headers(null), new ByteArrayInputStream(body));
        }
    }

    private Map<String, String> headers(String asset) {
        Map<String, String> h = new HashMap<>();
        boolean immutable = asset != null && !asset.endsWith(".html");
        h.put("Cache-Control", immutable ? "public, max-age=86400" : "no-cache");
        return h;
    }

    private class ShellChrome extends WebChromeClient {
        @Override
        public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                         FileChooserParams params) {
            if (filePathCallback != null) filePathCallback.onReceiveValue(null);
            filePathCallback = callback;
            try {
                startActivityForResult(params.createIntent(), FILE_CHOOSER);
                return true;
            } catch (ActivityNotFoundException e) {
                filePathCallback = null;
                return false;
            }
        }
    }
}
