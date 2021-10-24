function show_files(data) {
  for (var i = 0; i < data.length; i++) {
    $(".files-list").append(`
    <div class="file">
      <div class="download-file material-icons-outlined" value="${data[i].data_attachment_id}">
        file_download
      </div>
      <div class="file-name">${data[i].file_name}</div>
    </div>
    `);
  }

  $(".files-list").append(
    `<button class="download-all">SCARICA TUTTI I FILES</button>`
  );

  $(".download-file").click(function () {
    var id = $(this).attr("value");

    window.open(
      `https://drive.google.com/u/${account_id}/uc?id=${id}&export=download`,
      "_blank"
    );
    chrome.tabs.highlight({ tabs: index_url }, function () {});
  });
  $(".download-all").click(() => {
    for (var i = 0; i < files_data.length; i++) {
      window.open(
        `https://drive.google.com/u/${account_id}/uc?id=${files_data[i].data_attachment_id}&export=download`
      );
      chrome.tabs.highlight({ tabs: index_url }, function () {});
    }
  });
}


var index_url;
var page_url
var account_id;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  index_url = tabs[0].index;
  account_id = tabs[0].url.split("/")[4];
  chrome.tabs.sendMessage(tabs[0].id, { extension_click: "open" });
});

var files_data;
//ASCOLTO
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message) {
    if (request.message == "WRONG-PAGE") {
      $(".files-list").append(`
        <div class="wrong-page">YOU AREN'T ON THE RIGHT PAGE</div>
      `);
    } else {
      files_data = request.message;
      if (files_data.length == 0) {
        $(".files-list").append(
          `<div class="wrong-page">THERE ARE NO FILES</div>`
        );
      } else {
        show_files(files_data);
      }
    }
  }
});
