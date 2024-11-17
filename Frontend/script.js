document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Front-end Validation
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const formData = {
    firstName: document.getElementById("first-name").value,
    lastName: document.getElementById("last-name").value,
    email: document.getElementById("email").value,
    userName: document.getElementById("username").value,
    password: password,
  };

  console.log("formData", formData);
  try {
    const response = await fetch("https://broomees-kn7x.vercel.app/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful!");
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert("An error occurred!");
  }
});

// Fetch Users on Page Load
async function fetchUsers() {
  try {
    const response = await fetch("https://broomees-kn7x.vercel.app/user");
    const users = await response.json();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Call fetchUsers when the page loads
window.onload = fetchUsers;
