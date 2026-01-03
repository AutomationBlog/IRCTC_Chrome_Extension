var background = (function () {
  "use strict";
  function i(e) {
    return e == null || typeof e == "function" ? { main: e } : e;
  }
  const n = globalThis.browser?.runtime?.id
      ? globalThis.browser
      : globalThis.chrome,
    a = i(() => {
      n.action.onClicked.addListener(async (e) => {
        if (!e.id) return;
        const { enabled: s } = await n.storage.local.get("enabled"),
          r = !s;
        await n.storage.local.set({ enabled: r });
        try {
          await n.scripting.executeScript({
            target: { tabId: e.id },
            files: ["/injected.js"],
          }),
            await n.tabs.sendMessage(e.id, { enabled: r }),
            n.action.setBadgeText({ text: r ? "ON" : "OFF", tabId: e.id }),
            n.action.setBadgeBackgroundColor({
              color: r ? "#2e7d32" : "#d32f2f",
              tabId: e.id,
            });
        } catch (l) {
          console.error("Toggle failed:", l);
        }
      });
    });
  function u() {}
  function o(e, ...s) {}
  const c = {
    debug: (...e) => o(console.debug, ...e),
    log: (...e) => o(console.log, ...e),
    warn: (...e) => o(console.warn, ...e),
    error: (...e) => o(console.error, ...e),
  };
  let t;
  try {
    (t = a.main()),
      t instanceof Promise &&
        console.warn(
          "The background's main() function return a promise, but it must be synchronous"
        );
  } catch (e) {
    throw (c.error("The background crashed on startup!"), e);
  }
  return t;
})();
