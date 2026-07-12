const API = "http://localhost:3000/api";

const cards = document.querySelectorAll(".card");
const button = document.getElementById("continueBtn");

let selectedRole = null;

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("selected"));

        card.classList.add("selected");

        selectedRole = card.dataset.role;

        button.disabled = false;

    });

});

button.addEventListener("click", async () => {

    try {
        const token = localStorage.getItem("token");
    
        const response = await fetch(`${API}/profile/selectRole`, {
    
            method: "PUT",
    
            headers: {
    
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
    
            },
    
            body: JSON.stringify({
    
                role: selectedRole
    
            })
    
        });
    
        const data = await response.json();
    
        alert(data.message);
    
        if (response.ok) {

            localStorage.setItem("token", data.token);
            window.location.href = "updateProfile.html";
    
        }
        
    } catch (error) {
        console.log("error in updating role");
        console.log("fahhhhhhhhhhhh")
    }
});