const submitBtn = document.getElementById("submitBtn");
const resendBtn = document.getElementById("resendBtn");
const timerDisplay = document.getElementById("timerDisplay");
resendBtn.style.display = "none";
let message = "If you didn't get OTP tap to resend";
let startTime = 30;
let countdownInterval; // Variable to hold the interval ID

function updateCountDown() {
  let minutes = Math.floor(startTime / 60);
  let seconds = startTime % 60;

  seconds = seconds.toString().padStart(2, "0");
  timerDisplay.innerHTML = `${minutes}:${seconds}`;

  startTime = startTime - 1;

  if (startTime < 0) {
    clearInterval(countdownInterval);

    resendBtn.style.display = "block";
    return;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCountDown(); // Call the function once to immediately display the initial countdown
  countdownInterval = setInterval(updateCountDown, 1000); // Start the countdown and store the interval ID
});

submitBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://localhost:7000/otp";
  const value = document.getElementById("value").value.toString();
  const data = typeof value;
  console.log(data);
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  })
    .then((response) => {
      const popup = window.location.replace(response.url);
    })
    .then((result) => {
      // Handle the response or result here
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });
};

resendBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://localhost:7000/resend";

  await fetch(url)
    .then((response) => {
      console.log(response);
    })
    .then((result) => {
      // Handle the response or result here
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });
};
