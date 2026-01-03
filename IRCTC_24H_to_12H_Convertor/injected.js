var injected = (function () {
  "use strict";
  function c(t) {
    return t == null || typeof t == "function" ? { main: t } : t;
  }
  const a = globalThis.browser?.runtime?.id
      ? globalThis.browser
      : globalThis.chrome,
    u = c(() => {
      let t = null;
      const r = (n) => {
          const e = n.split(" ")[0];
          if (!/^\d{1,2}:\d{2}$/.test(e)) return n;
          let [l, f] = e.split(":").map(Number);
          return `${l % 12 || 12}:${f.toString().padStart(2, "0")} ${
            l >= 12 ? "PM" : "AM"
          }  |`;
        },
        s = () => {
          document
            .querySelectorAll("span.time > strong, span > strong.time")
            .forEach((n) => {
              const e = n;
              e.dataset.original || (e.dataset.original = e.innerText),
                (e.innerText = r(e.dataset.original)),
                (e.style.color = "#E73927"),
                (e.style.fontWeight = "bold");
            });
        },
        d = () => {
          document.querySelectorAll("[data-original]").forEach((n) => {
            const e = n;
            (e.innerText = e.dataset.original || e.innerText),
              (e.style.color = "");
          });
        };
      a.runtime.onMessage.addListener((n) => {
        n.enabled
          ? (s(), t || (t = window.setInterval(s, 2e3)))
          : (t && (clearInterval(t), (t = null)), d());
      });
    });
  function g() {}
  function o(t, ...r) {}
  const i = {
    debug: (...t) => o(console.debug, ...t),
    log: (...t) => o(console.log, ...t),
    warn: (...t) => o(console.warn, ...t),
    error: (...t) => o(console.error, ...t),
  };
  return (() => {
    try {
    } catch (r) {
      throw (i.error('Failed to initialize plugins for "injected"', r), r);
    }
    let t;
    try {
      (t = u.main()),
        t instanceof Promise &&
          (t = t.catch((r) => {
            throw (
              (i.error('The unlisted script "injected" crashed on startup!', r),
              r)
            );
          }));
    } catch (r) {
      throw (
        (i.error('The unlisted script "injected" crashed on startup!', r), r)
      );
    }
    return t;
  })();
})();
injected;
