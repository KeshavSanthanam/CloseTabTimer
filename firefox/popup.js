document.getElementById("startTimer").addEventListener("click", () => {
  const timer = document.getElementById("timer").value;
  const messageElement = document.getElementById("message");

  if (timer && !isNaN(timer) && timer > 0) {
    browser.runtime.sendMessage({ 
      action: "startTimer", 
      timer: parseInt(timer) 
    }).then(() => {
      // Show success message
      messageElement.style.display = "block";
      
      // Hide message after 3 seconds
      setTimeout(() => {
        messageElement.style.display = "none";
      }, 3000);
    }).catch(err => {
      console.error("Error sending message:", err);
      alert("Failed to set timer. See console for details.");
    });
  } else {
    alert("Please enter a valid number of seconds.");
  }
});