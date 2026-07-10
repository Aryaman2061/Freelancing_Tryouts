const API = "http://localhost:3000/api/auth";

document
.getElementById("loginForm")
.addEventListener("submit", async (e)=>{

e.preventDefault();

const body={

email:email.value,

password:password.value

};

const res=await fetch(`${API}/login`,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(body)

});

const data=await res.json();

if(res.ok){

localStorage.setItem("token",data.token);

alert("Login Success");

}else{

alert(data.message);

}

});