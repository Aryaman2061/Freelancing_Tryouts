


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
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "home.html";
        } else {
            alert(data.message || "Something went wrong during login.");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Failed to connect to the server.");
    }
});