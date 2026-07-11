window.handleGoogleResponse = async function (response) {
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