const API = "http://localhost:3000/api/auth";

document
.getElementById("signupForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const body = {

        name: name.value,

        email: email.value,

        password: password.value

    };

    const res = await fetch(`${API}/signup`, {

        method: "POST",

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify(body)

    });

    const data = await res.json();

    alert(data.message);

});