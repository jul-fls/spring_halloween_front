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
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status == "success") {
                window.location.href = "/dashboard";
            } else {
                alert(data.message);
            }
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
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let data = {
        email: email,
        password: password,
    };
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status == "success") {
                window.location.href = "/dashboard";
            } else {
                alert(data.message);
            }
        });
});