/* polymux site: in-page screenshot viewer. Every a.zoom opens a modal <dialog> with the full-size image of the
   theme-matching file (the <img> it belongs to, via currentSrc). Esc, the backdrop or x closes; arrow keys,
   the buttons or a swipe move between all a.zoom links of the page. Without JS a.zoom is a plain link. */
(function () {
  "use strict";
  var links = Array.prototype.slice.call(document.querySelectorAll("a.zoom"));
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  var dlg = document.createElement("dialog");
  dlg.className = "lb";
  dlg.tabIndex = -1;
  dlg.setAttribute("aria-label", "Screenshot viewer");
  dlg.innerHTML =
    '<figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>' +
    '<p class="lb-count" aria-live="polite"></p>' +
    '<button type="button" class="lb-btn lb-close" aria-label="Close">&times;</button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous screenshot">&lsaquo;</button>' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next screenshot">&rsaquo;</button>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector(".lb-img");
  var cap = dlg.querySelector(".lb-cap");
  var count = dlg.querySelector(".lb-count");
  var index = 0;
  var opener = null;

  function sourceImg(a) {
    var box = a.closest(".screen") || a;
    return box.querySelector("img");
  }

  function show(i) {
    index = (i + links.length) % links.length;
    var a = links[index];
    var src = sourceImg(a);
    var url = (src && src.currentSrc) || a.getAttribute("href");
    img.removeAttribute("width");
    img.removeAttribute("height");
    if (src && src.naturalWidth) {
      img.width = src.naturalWidth;
      img.height = src.naturalHeight;
    }
    img.src = url;
    img.alt = (src && src.alt) || "";
    cap.textContent = a.getAttribute("data-caption") || img.alt;
    count.textContent = (index + 1) + " / " + links.length;
  }

  function open(i, from) {
    opener = from || null;
    show(i);
    document.documentElement.classList.add("lb-open");
    dlg.showModal();
    dlg.focus(); /* the dialog itself: no focus ring on a tap; Tab reaches the buttons */
  }

  dlg.addEventListener("close", function () {
    document.documentElement.classList.remove("lb-open");
    img.removeAttribute("src");
    if (opener) opener.focus();
  });

  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      open(i, a);
    });
  });

  dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
  dlg.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
  dlg.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });

  /* backdrop: a click on the dialog itself, outside the figure and the buttons */
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg || e.target.classList.contains("lb-fig")) dlg.close();
  });

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
  });

  /* swipe left / right on touch screens */
  var x0 = null;
  dlg.addEventListener("touchstart", function (e) { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
  dlg.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) show(dx < 0 ? index + 1 : index - 1);
  }, { passive: true });
})();
