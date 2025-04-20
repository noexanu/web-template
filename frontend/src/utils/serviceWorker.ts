/**
 *  Service worker should not contain any imports.
 *  For local development run `pnpm run build:sw`.
 *  Almost every request is omitted for local development
 *  because of next cache-control header.
 */
const CACHE_NAME = "sw-cache";
const PREFETCH_ROUTES = ["/offline"];
const CACHE_DISABLED_ROUTES = new Set(["/offline"]);

// eslint-disable-next-line unicorn/prefer-global-this
const selfCopy = self as unknown as ServiceWorkerGlobalScope;
const logsEnabled = selfCopy.origin.includes("localhost");
const log = (message: string, ...args: unknown[]) =>
  logsEnabled && console.info(message, ...args);

const handleInstall = async () => {
  log("Installing service-worker...");

  const cache = await caches.open(CACHE_NAME);
  const updatingCache = cache.addAll(PREFETCH_ROUTES);
  const selfInstalling = selfCopy.skipWaiting();
  await Promise.all([updatingCache, selfInstalling]);

  log("Installed");
};

const handleFetch = async (event: FetchEvent): Promise<Response> => {
  const cache = await caches.open(CACHE_NAME);
  const { pathname } = new URL(event.request.url);
  const isGetMethod = event.request.method === "GET";
  const isTrpcRequest = pathname.startsWith("/trpc");
  const isCacheDisabled = CACHE_DISABLED_ROUTES.has(pathname);
  const shouldCacheResponse = isGetMethod && !isTrpcRequest && !isCacheDisabled;

  try {
    if (!shouldCacheResponse) {
      log("Cache disabled. Fetching...", event.request.url);
      return await fetch(event.request);
    }

    const cashedResponse = await cache.match(event.request);

    if (cashedResponse) {
      log("Cache hit", event.request.url);
      return cashedResponse;
    }

    log("No cache hit. Fetching...", event.request.url);
    const response = await fetch(event.request);
    const cacheControlHeader = response.headers.get("cache-control");
    const isCachingDisabled = cacheControlHeader?.includes("no-store") ?? false;

    if (response.ok && !isCachingDisabled) {
      log("Caching...", event.request.url);
      await cache.put(event.request, response.clone());
    }

    return response;
  } catch (error: unknown) {
    const offlinePage = await cache.match("/offline");

    if (offlinePage) {
      log("Network error appear. Going offline...");
      return offlinePage;
    }

    log("Unhandled network error appear");
    throw error;
  }
};

selfCopy.addEventListener("install", handleInstall);
selfCopy.addEventListener("fetch", (event: FetchEvent) =>
  event.respondWith(handleFetch(event)),
);
