/* polymux site: theme toggle, screenshot sources that follow it, tmux-style active window, copy button. */
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "polymux-theme";
  var ORDER = ["auto", "light", "dark"];

  function saved() {
    var t = root.getAttribute("data-theme");
    return t === "light" || t === "dark" ? t : "auto";
  }

  /* <source data-dark> carries the dark shot; point its media at the forced theme so the toggle swaps shots too. */
  function syncSources(mode) {
    var media = mode === "dark" ? "all" : mode === "light" ? "not all" : "(prefers-color-scheme: dark)";
    var list = document.querySelectorAll("source[data-dark]");
    for (var i = 0; i < list.length; i++) list[i].setAttribute("media", media);
  }

  function apply(mode) {
    if (mode === "auto") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", mode);
    try {
      if (mode === "auto") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (e) { /* storage blocked: the choice lasts for this page only */ }
    syncSources(mode);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.querySelector("[data-mode]").textContent = mode;
      btn.setAttribute("aria-label", "Colour theme: " + mode + ". Switch theme");
    }
  }

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = ORDER[(ORDER.indexOf(saved()) + 1) % ORDER.length];
      apply(next);
    });
  }
  apply(saved());

  /* status line: mark the window (section) in view the way tmux does, with a "*" after its name */
  var links = document.querySelectorAll(".status-windows a[href^='#']");
  if (links.length && "IntersectionObserver" in window) {
    var byId = {};
    for (var i = 0; i < links.length; i++) byId[links[i].getAttribute("href").slice(1)] = links[i];
    var current = null;
    var setCurrent = function (id) {
      if (current === id || !byId[id]) return;
      if (current && byId[current]) byId[current].removeAttribute("aria-current");
      current = id;
      var a = byId[id];
      a.setAttribute("aria-current", "location");
      var bar = a.parentNode.parentNode;
      var left = a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2;
      bar.scrollTo({ left: Math.max(0, left), behavior: "auto" });
    };
    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) setCurrent(entries[j].target.id);
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* copy buttons: copy the text of the element named in data-copy */
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  var buttons = document.querySelectorAll("button[data-copy]");
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      if (!src) return;
      var text = src.getAttribute("data-text") || src.textContent;
      var label = btn.querySelector("span") || btn;
      var done = function (ok) {
        label.textContent = ok ? "Copied" : "Select and copy";
        setTimeout(function () { label.textContent = "Copy"; }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
      } else {
        done(fallbackCopy(text));
      }
    });
  });
})();
