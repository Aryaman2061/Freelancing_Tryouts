const API = "http://localhost:3000/api/auth";

async function handleGoogleResponse(response) {

    const res = await fetch(`${API}/google`, {

        method: "POST",

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify({

            credential: response.credential

        })

    });

    const data = await res.json();

    if(res.ok){

        localStorage.setItem("token",data.token);

        alert("Google Login Successful");

    }

    else{

        alert(data.message);

    }

}