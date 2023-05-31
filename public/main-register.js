const registerBtn = document.getElementById("registerBtn");

registerBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://localhost:7000/register";
  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(data);

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response or result here
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    });
};
