document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let isValid = true;

  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("email-error").innerText = "Invalid email address";
    isValid = false;
  } else {
    document.getElementById("email-error").innerText = "";
  }

  if (password.length < 6) {
    document.getElementById("password-error").innerText =
      "Password must be at least 6 characters";
    isValid = false;
  } else {
    document.getElementById("password-error").innerText = "";
  }

  if (!isValid) return;

  try {
    const response = await fetch(
      "https://broomees-y6z2-mern-api.vercel.app/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (response.ok) {
      alert(
        data.message || "Login successful! Redirecting to the home page..."
      );
      window.location.href = "./home.html";
    } else {
      alert(`Error: ${data.message || data}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during login!" + error);
  }
});
