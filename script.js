BACKEND_API_URL = "https://aef2-89-156-51-241.eu.ngrok.io/api";

loginTab = document.getElementById("login-tab");
registerTab = document.getElementById("register-tab");
loginForm = document.getElementById("login-form");
registerForm = document.getElementById("register-form");

loginTab.addEventListener("click", function () {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    this.classList.add("bg-blue-500", "text-white");
    registerTab.classList.remove("bg-blue-500", "text-white");
    registerTab.classList.add("text-blue-500");
});
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    let data = {
        email: email,
        password: password,
    };
    fetch(BACKEND_API_URL+"/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            alert("Login failed.");
            throw new Error("Login failed.");
        }
    })
    .then((userData) => {
        document.cookie = "user=" + JSON.stringify(userData);
        userCookie = JSON.parse(document.cookie.split("; ").find(row => row.startsWith("user=")).split("=")[1]);
        window.location.href = "/dashboard";
        // create a cookie with the user data
    })
    .catch((error) => {
        console.error(error);
    });
});


registerTab.addEventListener("click", function () {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    this.classList.add("bg-blue-500", "text-white");
    loginTab.classList.remove("bg-blue-500", "text-white");
    loginTab.classList.add("text-blue-500");
});

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let firstName = document.getElementById("register-firstName").value;
    let lastName = document.getElementById("register-lastName").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let confirm_password = document.getElementById("register-confirm-password").value; 
    if(password != confirm_password){
        alert("Passwords do not match.");
        return;
    }
    let data = {
        firstName : firstName,
        lastName : lastName,
        email: email,
        password: password,
    };
    fetch(BACKEND_API_URL+"/user/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        if (res.status === 200) {
            window.location.href = "/dashboard";
        } else {
            alert("Error creating user.");
        }
    })
    .catch((error) => {
        console.error(error);
    });
});