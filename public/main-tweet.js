const socket = io();
const url = "http://localhost:7000/tweet";
// Retrieve the value of the tweet input

const tweetBtn = document.getElementById("tweetBtn");

// Handle the tweet button click event
tweetBtn.onclick = async (e) => {
  e.preventDefault();

  const tweet = document.getElementById("tweetValue").value;

  socket.emit("message", tweet);

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tweet }),
  })
    .then((response) => {
      const popup = window.location.replace(response.url);
    })
    // .then((result) => {
    //   // Handle the response or result here
    //   console.log(result);
    // })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });
};

socket.on("message", async (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  const ul = document.getElementById("ul");
  ul.appendChild(li);
});
