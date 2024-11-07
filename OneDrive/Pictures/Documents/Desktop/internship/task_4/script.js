document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("mainContent");
    const homeBtn = document.getElementById("homeBtn");
    const registrationBtn = document.getElementById("registrationBtn");

    homeBtn.addEventListener("click", loadHome);
    registrationBtn.addEventListener("click", loadRegistration);

    function loadHome() {
        mainContent.innerHTML = `
            <h2>Welcome Home!</h2>
            <p>Click "Register" to create a new account.</p>
        `;
    }

    function loadRegistration() {
        mainContent.innerHTML = `
            <h2>User Registration</h2>
            <form id="registrationForm">
                <label for="username">Username:</label>
                <input type="text" id="username" required>
                <div id="usernameError" class="error"></div>

                <label for="password">Password:</label>
                <input type="password" id="password" required>
                <div id="passwordError" class="error"></div>

                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" required>
                <div id="confirmPasswordError" class="error"></div>

                <button type="submit">Register</button>
            </form>
        `;

        const form = document.getElementById("registrationForm");
        form.addEventListener("submit", validateForm);
    }

    function validateForm(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Clear previous error messages
        document.getElementById("usernameError").innerText = '';
        document.getElementById("passwordError").innerText = '';
        document.getElementById("confirmPasswordError").innerText = '';

        // Validation checks
        let valid = true;

        // Username validation (must be at least 3 characters)
        if (username.length < 3) {
            document.getElementById("usernameError").innerText = 'Username must be at least 3 characters.';
            valid = false;
        }

        // Password validation (at least 8 characters and includes a number)
        const passwordRegex = /^(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            document.getElementById("passwordError").innerText = 'Password must be at least 8 characters and contain a number.';
            valid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").innerText = 'Passwords do not match.';
            valid = false;
        }

        // If valid, display success message
        if (valid) {
            alert('Registration successful!');
            loadHome();
        }
    }
});
