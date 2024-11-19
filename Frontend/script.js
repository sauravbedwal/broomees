document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstNameInput = document.getElementById("signup-first-name");
  const lastNameInput = document.getElementById("signup-last-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const userNameInput = document.getElementById("signup-username");
  const confirmPasswordInput = document.getElementById(
    "signup-confirm-password"
  );

  const emailError = document.getElementById("signup-email-error");
  const passwordError = document.getElementById("signup-password-error");
  const confirmPasswordError = document.getElementById(
    "signup-confirm-password-error"
  );

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const userName = userNameInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  let isValid = true;

  // Validation
  if (!email.includes("@") || !email.includes(".")) {
    emailError.innerText = "Invalid email address";
    isValid = false;
  } else {
    emailError.innerText = "";
  }

  if (password.length < 6) {
    passwordError.innerText = "Password must be at least 6 characters";
    isValid = false;
  } else {
    passwordError.innerText = "";
  }

  if (password !== confirmPassword) {
    confirmPasswordError.innerText = "Passwords do not match";
    isValid = false;
  } else {
    confirmPasswordError.innerText = "";
  }

  if (!isValid) return;

  // API call
  try {
    const response = await fetch(
      "https://broomees-y6z2-mern-api.vercel.app/api/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          userName,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! Redirecting to the home page...");
      window.location.href = "./home.html";
    } else {
      alert(`Error: ${data.message} ${data.err} `);
    }
  } catch (error) {
    alert("An error occurred during signup!");
  }
});
