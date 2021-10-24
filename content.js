//ASCOLTO
chrome.runtime.onMessage.addListener(function (request) {
  if (request.extension_click === "open") {
    cerca_files();
  }
});

function cerca_files() {
  if (window.location.href.includes("details")) {
    var num_figli = $("div.v7wOcf.ZGnOx").children().length;
    var title = $("title").text();
    var i;

    for (i = 0; i < num_figli; i++) {
      if ($(`div.v7wOcf.ZGnOx > div:eq(${i}) div.N5dSp span`).text() == title) {
        break;
      }
    }

    var html_files = $(
      `div.v7wOcf.ZGnOx > div:eq(${i}) div.EE538 a[data-attachment-id]`
    );

    var data = [];
    for (var z = 0; z < html_files.length; z++) {
      if (
        !html_files[z]["attributes"]["href"]["value"].includes(
          "drive.google.com"
        )
      ) {
        break;
      }

      var single_data = {
        file_name: html_files[z]["ariaLabel"],
        data_attachment_id:
          html_files[z]["attributes"]["data-attachment-id"]["value"],
      };

      data.push(single_data);
    }
    chrome.runtime.sendMessage({ message: data });
  } else {
    chrome.runtime.sendMessage({ message: "WRONG-PAGE" });
  }
}
