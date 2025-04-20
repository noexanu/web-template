export const isServiceWorkerRequest = (headers: Headers) =>
  !!headers.get("referer")?.includes("serviceWorker.js");

export const registerServiceWorker = () => {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then((registration) => registration.update())
    // ignore every potential error
    .catch(() => {});
};
