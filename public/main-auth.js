const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = async (e) => {
  e.preventDefault();

  const url = "http://localhost:7000/auth";
  const data = {
    username_email: document.getElementById("username").value,

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
    .then((response) => {
      //   const popup = window.location.replace(response.url);
      console.log(response);
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
