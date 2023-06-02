const registerBtn = document.getElementById("registerBtn");

registerBtn.onclick = async (e) => {
  // e.preventDefault();

  const url = "http://localhost:7000/register";
  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(data);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Handle the response here if needed
      console.log("Registration successful");
      // Redirect to a new page
      window.location.replace("http://localhost:7000/otp");
    } else {
      // Handle the error response here if needed
      console.error("Registration failed");
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error:", error);
  }
};
