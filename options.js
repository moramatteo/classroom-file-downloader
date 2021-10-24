var valore;
const browser = window.chrome || window.browser;

browser.storage.local.get("key", function (results) {
  $("#attuale").text(results.key);
});

$("#aggiorna").click(function () {
  browser.storage.local.set({ key: $("#input").val() });
  $("#attuale").text($("#input").val());
});
