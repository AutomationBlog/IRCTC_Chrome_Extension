chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      document.querySelectorAll("span.time > strong").forEach((el) => {
        const timeStrValue = el.innerText;
        const timeStr = timeStrValue.split(" ")[0];
        console.log(timeStr);
        if (!/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
        let [hours, minutes] = timeStr.split(":");
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        el.innerText = `${hours}:${minutes} ${ampm} ${
          timeStrValue.split(" ")[1] || " |"
        }`;
      });
      document.querySelectorAll("span>strong.time").forEach((el) => {
        const timeStrValue2 = el.innerText;
        const timeStr2 = timeStrValue2.split(" ")[0];
        console.log(timeStr2);
        if (!/^\d{2}:\d{2}$/.test(timeStr2)) return timeStr2;
        let [hours, minutes] = timeStr2.split(":");
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        el.innerText = `${hours}:${minutes} ${ampm} ${
          timeStrValue2.split(" ")[1] || " |"
        }`;
      });
    },
  });
});
