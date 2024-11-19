# broomees

A simple user management system that includes a **Signup**, **Login**, and **Logout** functionality, developed using **HTML**, **CSS**, **JavaScript**, **Node.js**, and **MongoDB**. This project uses **REST APIs** for backend operations and a dynamic frontend for a seamless user experience.

## **Features**

1. **Signup Page**:
   - Users without an account can create one by signing up.
   - Form validation is implemented on the frontend to ensure data integrity.
   - After successful signup, the user is redirected to the **Home Page**.

2. **Home Page**:
   - Displays a list of all users stored in the MongoDB database, including their **name** and **email address**.
   - Includes a **Logout Button** to securely log out of the session.
   - On logout, the user is redirected to the **Login Page**.

3. **Login Page**:
   - Allows existing users to log in using their registered **email** and **password**.
   - After successful login, the user is redirected back to the **Home Page**.

4. **Data Management**:
   - Data is saved securely in a **MongoDB** database using **Node.js** backend APIs.
   - Includes **validation** for all inputs on both frontend and backend.

---

## **API Endpoints**

1. **Signup API** (`POST /api/signup`):
   - Registers a new user by saving their details (name, email, and password) in the database.
   - Passwords are securely encrypted before being stored in the database.

2. **Get Users API** (`GET /api/users`):
   - Fetches the list of all users from the database.
   - Returns the user’s name and email for display on the **Home Page**.

3. **Login API** (`POST /api/login`):
   - Authenticates users based on their email and password.
   - Returns a success message and redirects to the **Home Page** upon successful authentication.

4. **Logout API** (`POST /api/logout`):
   - Logs out the current user and invalidates their session.
   - Redirects the user to the **Login Page**.

---

## **Technologies Used**

### **Frontend**
- **HTML**: Structure and content of the application.
- **CSS**: Styling and layout.
- **JavaScript**: Frontend form validation and API integration.

### **Backend**
- **Node.js**: Backend server and API creation.
- **Express.js**: Framework for handling routes and APIs.
- **MongoDB**: NoSQL database for storing user data.

---

## **How It Works**

1. **Signup**:
   - A new user enters their details (name, email, and password) on the Signup Page.
   - The data is validated on the frontend.
   - A `POST` request is sent to the `/api/signup` endpoint.
   - After successful signup, the user is redirected to the Home Page.

2. **Home Page**:
   - Fetches the list of all users using a `GET` request to the `/api/users` endpoint.
   - Displays the user list with their name and email.
   - Includes a Logout button that triggers a `POST` request to the `/api/logout` endpoint.

3. **Login**:
   - An existing user enters their credentials on the Login Page.
   - The data is validated on the frontend.
   - A `POST` request is sent to the `/api/login` endpoint.
   - After successful login, the user is redirected to the Home Page.

4. **Logout**:
   - Logs out the current user by invalidating their session.
   - Redirects to the Login Page.

---

## **Project Structure**

```
|-- /assets          # Static files like images, CSS, and JavaScript
|-- /backend         # Node.js backend files
    |-- index.js     # Entry point for the server
    |-- routes/      # API route handlers
|-- /frontend        # Frontend files
    |-- index.html   # Signup Page
    |-- login.html   # Login Page
    |-- home.html    # Home Page
|-- /db              # MongoDB connection and models
|-- README.md        # Project documentation
```

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Install and configure MongoDB locally or use a hosted solution like MongoDB Atlas.
   - Update the MongoDB connection string in your backend configuration.

4. Run the backend server:
   ```bash
   node index.js
   ```

5. Open the frontend files (`index.html`) in a browser to start the application.

---

## **Future Enhancements**

- Add authentication using **JWT**.
- Enhance the user interface with frameworks like **Bootstrap** or **Material UI**.
- Implement session management for better security.

---

Let me know if you need further refinements or additional details!
