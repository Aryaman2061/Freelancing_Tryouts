const cards = document.querySelectorAll(".card");
const button = document.getElementById("continueBtn");

let selectedRole = null;

window.addEventListener("DOMContentLoaded",async ()=>{
    //checks if user present or not
    const data = await checkAuth();
    if(!data) return;
    //checks if role already selected
    if(data.user.role){
        window.location.href="home.html";
        return;
    }
})

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
    
        const response = await fetch(`${API_URL}/profile/selectRole`, {
    
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

        if(!response.ok){
            console.log(data)
            alert(data.message);
            window.location.href="login.html";
        } else{
            localStorage.setItem("token", data.token);
            window.location.href = "updateProfile.html";
        }
    

    } catch (error) {
        console.log("error in updating role");
        console.log("fahhhhhhhhhhhh")
    }
});