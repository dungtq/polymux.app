/* polymux site: apply the saved theme before first paint (loaded sync in <head>). */
(function () {
  var t = null;
  try { t = localStorage.getItem("polymux-theme"); } catch (e) { t = null; }
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
})();
