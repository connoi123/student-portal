document.addEventListener("DOMContentLoaded", () => {
    const appDiv = document.getElementById("app");
  
    // Simulate mock grades
    const mockGrades = [
      { subject: "Math", grade: "90" },
      { subject: "Science", grade: "99" },
      { subject: "History", grade: "97" },
      { subject: "English", grade: "98" },
    ];
  
    // Load initial registration page
    function loadRegistrationPage() {
      appDiv.innerHTML = `
        <h2>Student Registration</h2>
        <form id="registrationForm">
          <label>Full Name:</label>
          <input type="text" id="fullName" required>
          <label>Email:</label>
          <input type="email" id="email" required>
          <label>Password:</label>
          <input type="password" id="password" required>
          <button type="submit">Register</button>
        </form>
      `;
      document.getElementById("registrationForm").addEventListener("submit", registerUser);
    }
  
    // Handle user registration
    function registerUser(event) {
      event.preventDefault();
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify({ fullName, email, password }));
      alert("Registration successful! Proceed to login.");
      loadLoginPage();
    }
  
    // Load login page
    function loadLoginPage() {
      appDiv.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
          <label>Email:</label>
          <input type="email" id="loginEmail" required>
          <label>Password:</label>
          <input type="password" id="loginPassword" required>
          <button type="submit">Login</button>
        </form>
      `;
      document.getElementById("loginForm").addEventListener("submit", loginUser);
    }
  
    // Handle user login
    function loginUser(event) {
      event.preventDefault();
      const loginEmail = document.getElementById("loginEmail").value;
      const loginPassword = document.getElementById("loginPassword").value;
  
      // Retrieve user data from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (user && user.email === loginEmail && user.password === loginPassword) {
        alert("Login successful!");
        loadDashboard(user);
      } else {
        alert("Invalid email or password!");
      }
    }
  
    // Load dashboard
    function loadDashboard(user) {
        console.log('Loading dashboard...');
        appDiv.innerHTML = `
          <div class="dashboard">
            <h2>Welcome, ${user.fullName}!</h2>
            <table>
              <tr><th>Field</th><th>Information</th></tr>
              <tr><td>Email</td><td>${user.email}</td></tr>
              <tr><td>Full Name</td><td>${user.fullName}</td></tr>
            </table>
            <button id="updateProfile">Update Profile</button>
            <button id="viewGrades">View Grades</button>
            <button id="logout">Logout</button>
            <div id="modalContainer"></div>
          </div>
        `;
  
      // Attach event listeners for dashboard buttons
      document.getElementById("updateProfile").addEventListener("click", updateProfile);
      document.getElementById("viewGrades").addEventListener("click", viewGrades);
      document.getElementById("logout").addEventListener("click", logoutUser);
    }
  
    // Update profile functionality
    function updateProfile() {
      const user = JSON.parse(localStorage.getItem("user"));
      const newName = prompt("Enter your updated full name:", user.fullName);
      const newEmail = prompt("Enter your updated email:", user.email);
  
      if (newName && newEmail) {
        user.fullName = newName;
        user.email = newEmail;
        localStorage.setItem("user", JSON.stringify(user));
        alert("Profile updated successfully!");
        loadDashboard(user);
      }
    }
  
    // View grades functionality
    function viewGrades() {
      const modalContainer = document.getElementById("modalContainer");
      const gradesTable = mockGrades
        .map(grade => `<tr><td>${grade.subject}</td><td>${grade.grade}</td></tr>`)
        .join("");
  
      modalContainer.innerHTML = `
        <div class="modal">
          <h3>Your Grades</h3>
          <table>
            <thead>
              <tr><th>Subject</th><th>Grade</th></tr>
            </thead>
            <tbody>
              ${gradesTable}
            </tbody>
          </table>
          <button onclick="closeModal()">Close</button>
        </div>
      `;
    }
  
    // Logout functionality
    function logoutUser() {
      alert("Logged out successfully!");
      loadLoginPage();
    }
  
    // Close modal
    window.closeModal = function () {
      document.getElementById("modalContainer").innerHTML = "";
    };
  
    // Initial load
    loadRegistrationPage();
  });