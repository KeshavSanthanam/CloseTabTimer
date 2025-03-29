let timerId = null;

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    // Clear any previous timer
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    // Start new timer
    timerId = setTimeout(() => {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(tabs => {
          if (tabs.length > 0) {
            return browser.tabs.remove(tabs[0].id);
          }
        })
        .catch(err => {
          console.error("Error closing tab:", err);
        });
    }, message.timer * 1000);
  }
});