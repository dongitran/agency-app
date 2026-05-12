// CORS proxy for the tử vi API used by the prototype on GitHub Pages.
// Locked to the phuclinhbaodinh.vn host so the worker isn't a generic open proxy.

const ALLOWED_HOST = "phuclinhbaodinh.vn";
const ALLOWED_PATH_PREFIX = "/apiServer/";

function corsHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    ...extra,
  };
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    const url = new URL(request.url);
    const target = url.searchParams.get("url");
    if (!target) {
      return new Response(JSON.stringify({ error: "missing ?url= param" }), {
        status: 400,
        headers: corsHeaders({ "Content-Type": "application/json" }),
      });
    }

    let targetUrl;
    try {
      targetUrl = new URL(target);
    } catch {
      return new Response(JSON.stringify({ error: "invalid url" }), {
        status: 400,
        headers: corsHeaders({ "Content-Type": "application/json" }),
      });
    }

    if (targetUrl.hostname !== ALLOWED_HOST || !targetUrl.pathname.startsWith(ALLOWED_PATH_PREFIX)) {
      return new Response(JSON.stringify({ error: "host or path not allowed" }), {
        status: 403,
        headers: corsHeaders({ "Content-Type": "application/json" }),
      });
    }

    try {
      const upstream = await fetch(targetUrl.toString(), {
        method: request.method,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "vi,en-US;q=0.9,en;q=0.8",
          Referer: "https://phuclinhbaodinh.vn/",
        },
        body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer(),
      });
      const body = await upstream.arrayBuffer();
      return new Response(body, {
        status: upstream.status,
        headers: corsHeaders({
          "Content-Type": upstream.headers.get("Content-Type") || "application/json",
          "Cache-Control": "public, max-age=300",
        }),
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: "upstream fetch failed", detail: String(e) }), {
        status: 502,
        headers: corsHeaders({ "Content-Type": "application/json" }),
      });
    }
  },
};
