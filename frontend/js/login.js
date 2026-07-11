const API = "http://localhost:3000/api/auth";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Explicitly select element values to prevent errors across different browser environments
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    const body = {
        email: emailValue,
        password: passwordValue
    };

    try {
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            alert("Login Success");
            // Optional: window.location.href = "/feed.html";
        } else {
            alert(data.message || "Something went wrong during login.");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Failed to connect to the server.");
    }
});