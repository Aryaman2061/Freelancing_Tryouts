const API_URL = "http://localhost:3000/api";

async function checkAuth(){
    const token = localStorage.getItem("token");
    if(!token){
        alert("no token");
        window.location.href = "login.html";
        return null;
    }

    try {

        const response = await fetch(`${API_URL}/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(!response.ok){
            localStorage.removeItem("token");
            window.location.href="login.html";
            return null;
        }

        return await response.json();

    } catch (error) {
        alert("error in auth");
        localStorage.removeItem("token");
        window.location.href="login.html";
        return null;
    }

}