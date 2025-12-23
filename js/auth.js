document.addEventListener('DOMContentLoaded', () => {
    // Redirect if already logged in (specific to index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        checkAuth(false);
    }

    // --- DOM Elements ---
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const logoutBtn = document.getElementById('logoutBtn');

    // --- Login Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                alert("Please enter both username and password.");
                return;
            }

            // Retrieve registered users
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Find matching user
            const validUser = users.find(u => u.username === username && u.password === password);

            if (validUser) {
                // Set Session
                const userSession = {
                    username: validUser.username,
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('elderUser', JSON.stringify(userSession));
                window.location.href = 'dashboard.html';
            } else {
                alert("Invalid username or password. Please try again or register.");
            }
        });
    }

    // --- Registration Logic ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newUsernameInput = document.getElementById('reg-username');
            const newPasswordInput = document.getElementById('reg-password');
            const username = newUsernameInput.value.trim();
            const password = newPasswordInput.value.trim();

            if (!username || !password) {
                alert("Please enter both username and password.");
                return;
            }

            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check if username exists
            if (users.some(u => u.username === username)) {
                alert("Username already exists. Please choose another.");
                return;
            }

            // Register new user
            users.push({
                username: username,
                password: password, // In a real app, hash this!
                created_at: new Date().toISOString()
            });
            localStorage.setItem('users', JSON.stringify(users));

            alert("Registration successful! Please login.");

            // Reset and switch to login
            registerForm.reset();
            showLoginView();
        });
    }

    // --- Toggle Views ---
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginView();
        });
    }

    function showLoginView() {
        if (loginContainer && registerContainer) {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    }

    // --- Logout Logic ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('elderUser');
            window.location.href = 'index.html';
        });
    }
});
