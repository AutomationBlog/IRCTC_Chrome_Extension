const toggle = document.getElementById("formatToggle");

// Load saved setting
chrome.storage.sync.get("is12h", (data) => {
  toggle.checked = data.is12h || false;
});

// Save setting and notify content script
toggle.addEventListener("change", () => {
  const is12h = toggle.checked;
  chrome.storage.sync.set({ is12h });

  document.querySelectorAll("span.time>strong").forEach((el) => {
    el.innerText = is12h ? "12-Hour Format Enabled" : "24-Hour Format Enabled";
  });

  document.querySelector("span.time").innerText = is12h
    ? "All times are now shown in 12-hour format."
    : "All times are now shown in 24-hour format.";

  // // Send message to the active tab to refresh the view
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   chrome.tabs.sendMessage(tabs[0].id, { action: "toggleFormat", is12h });
  // });
});
