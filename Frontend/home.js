async function getCurrentUser() {
  try {
    const response = await fetch(
      "https://broomees-y6z2-mern-api.vercel.app/api/current-user"
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
  return null;
}

async function fetchUsers() {
  try {
    const response = await fetch(
      "https://broomees-y6z2-mern-api.vercel.app/api/user"
    );
    const users = await response.json();

    const usersList = document.getElementById("users-list");
    usersList.innerHTML = "";

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.firstName} ${user.lastName} - ${user.email}`;
      usersList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

document.getElementById("logout").addEventListener("click", () => {
  alert("Logged out successfully!");
  window.location.href = "login.html";
});

window.onload = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    document.getElementById("user-firstname").textContent =
      currentUser.firstName;
  } else {
    document.getElementById("user-firstname").textContent = "";
  }

  fetchUsers();
};
