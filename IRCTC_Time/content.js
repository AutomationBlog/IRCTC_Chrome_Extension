function convertTo12Hour(timeStr) {
  if (!/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
  let [hours, minutes] = timeStr.split(":");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// Note: IRCTC uses dynamic loading, so we target
// common time elements like 'strong' or specific classes.
function updateTimes(is12h) {
  console.log("Updating times to", is12h ? "12-hour" : "24-hour");
  // if (!is12h) {
  //   location.reload(); // Simplest way to revert to original 24h
  //   return;
  // }

  // const elements = document.querySelectorAll("span.time");
  // elements.forEach((el) => {
  //   if (el.innerText.match(/^\d{2}:\d{2}$/)) {
  //     el.innerText = convertTo12Hour(el.innerText);
  //   }
  // });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request) => {
  const is12h = request.is12h;
  console.log("Toggling 12h format to", is12h);
  // if (request.action === "toggleFormat") {
  //   updateTimes(request.is12h);
  //   console.log("Updating times to", is12h ? "12-hour" : "24-hour");
  // }
});
