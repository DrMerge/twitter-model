const submitBtn = document.getElementById("submitBtn");

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
