const API = "http://localhost:3000/api/auth";

document
  .getElementById("signupForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // console.log(firstName.value)
    const body = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };

    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "index.html"; // change to wherever signup should redirect
    }
  });

// Called automatically by Google's script when someone signs in via the
// "Sign in with Google" button (see data-callback="handleGoogleResponse" in register.html)
async function handleGoogleResponse(response) {
  try {
    const res = await fetch(`${API}/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: response.credential }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Google sign-in failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    // window.location.href = "index.html"; // change to wherever login should redirect
  } catch (err) {
    console.error("Google sign-in error:", err);
    alert("Something went wrong signing in with Google");
  }
}