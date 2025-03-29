let timerId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    // Clear any previous timer if one is already running
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    // Start a new timer
    timerId = setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.remove(tabs[0].id).catch(err => {
            console.error("Error closing tab:", err);
          });
        }
      });
    }, message.timer * 1000); // Convert seconds to milliseconds
  }
});