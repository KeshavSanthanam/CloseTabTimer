document.getElementById("startTimer").addEventListener("click", () => {
  const timer = document.getElementById("timer").value;
  const messageElement = document.getElementById("message");

  if (timer && !isNaN(timer) && timer > 0) {
    console.log("Sending timer value:", timer);
    chrome.runtime.sendMessage({ action: "startTimer", timer: parseInt(timer) }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError);
      } else {
        console.log("Timer started successfully");
      }
    });
    
    // Show success message
    messageElement.style.display = "block";
    
    // Optionally hide the message after 3 seconds
    setTimeout(() => {
      messageElement.style.display = "none";
    }, 3000);
  } else {
    alert("Please enter a valid number of seconds.");
  }
});