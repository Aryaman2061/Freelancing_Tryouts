// const API_URL = "http://localhost:3000/api";

// const token = localStorage.getItem("token");

// const profileForm = document.getElementById("profileForm");

// let currentUser = null;
// let selectedProfilePicture = null;

// window.addEventListener("DOMContentLoaded", loadProfile);

// async function loadProfile() {

//     try {

//         const response = await fetch(`${API_URL}/profile`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             alert(data.message);
//             return;
//         }

//         currentUser = data.user;

//         renderForm(currentUser);

//         initializeImageUpload()

//     }

//     catch (err) {

//         console.error(err);

//         alert("Unable to load profile.");

//     }

// }

// function renderForm(user) {

//     profileForm.innerHTML = "";

//     renderCommonFields(user);

//     if (user.role === "freelancer") {

//         renderFreelancerFields(user);

//     }

//     else {

//         renderClientFields(user);

//     }

//     renderSaveButton();

// }

// function renderSaveButton() {

//     profileForm.innerHTML += `
    
//         <button type="submit">
//             Save Profile
//         </button>

//     `;

// }

// function initializeImageUpload(){

//     changeProfilePicture.onclick = () => {
//         profilePictureInput.click();
//     };

//     profilePictureInput.onchange = (e) => {

//         const file = e.target.files[0];
//         if (!file) return;

//         selectedProfilePicture = file;

//         const reader = new FileReader();
//         reader.onload = () => {
//             profilePreview.src = reader.result;
//         };
//         reader.readAsDataURL(file);

//     };
// }

// function renderCommonFields(user) {

//     profileForm.innerHTML += `

//         <div class="profile-picture-wrapper">
//             <img
//                 id="profilePreview"
//                 class="profile-picture"
//                 src="${user.profilePicture || '/images/default-avatar.png'}"
//             >
//             <input
//                 type="file"
//                 id="profilePictureInput"
//                 accept="image/*"
//                 hidden
//             >
//             <button
//                 type="button"
//                 id="changeProfilePicture"
//             >
//                 Change Photo
//             </button>
//         </div>


//         <label>First Name</label>
//         <input
//             type="text"
//             id="firstName"
//             value="${user.firstName || ""}"
//         >

//         <label>Last Name</label>
//         <input
//             type="text"
//             id="lastName"
//             value="${user.lastName || ""}"
//         >

//         <label>Bio</label>
//         <textarea
//             id="bio"
//         >${user.bio || ""}</textarea>

//         <label>Phone</label>
//         <input
//             type="text"
//             id="phone"
//             value="${user.phone || ""}"
//         >

//         <label>Website</label>
//         <input
//             type="text"
//             id="website"
//             value="${user.website || ""}"
//         >

//         <label>Location</label>
//         <input
//             type="text"
//             id="location"
//             value="${user.location || ""}"
//         >

//     `;

// }

// function renderFreelancerFields(user) {

//     profileForm.innerHTML += `

//         <h2>Professional Information</h2>

//         <label>Professional Title</label>
//         <input
//             type="text"
//             id="title"
//             value="${user.title || ""}"
//         >

//         <label>Skills</label>
//         <input
//             type="text"
//             id="skills"
//             value="${(user.skills || []).join(", ")}"
//         >

//         <label>Experience Level</label>

//         <select id="experienceLevel">

//             <option value="beginner"
//                 ${user.experienceLevel === "beginner" ? "selected" : ""}>
//                 Beginner
//             </option>

//             <option value="intermediate"
//                 ${user.experienceLevel === "intermediate" ? "selected" : ""}>
//                 Intermediate
//             </option>

//             <option value="expert"
//                 ${user.experienceLevel === "expert" ? "selected" : ""}>
//                 Expert
//             </option>

//         </select>

//         <label>Hourly Rate</label>
//         <input
//             type="number"
//             id="hourlyRate"
//             value="${user.hourlyRate || 0}"
//         >

//         <label>Languages</label>
//         <input
//             type="text"
//             id="languages"
//             value="${(user.languages || []).join(", ")}"
//         >

//         <label>Resume</label>
//         <input
//             type="text"
//             id="resume"
//             value="${user.resume || ""}"
//         >

//     `;

// }

// function renderClientFields(user) {

//     profileForm.innerHTML += `

//         <h2>Company Information</h2>

//         <label>Company Name</label>
//         <input
//             type="text"
//             id="companyName"
//             value="${user.companyName || ""}"
//         >

//         <label>Company Website</label>
//         <input
//             type="text"
//             id="companyWebsite"
//             value="${user.companyWebsite || ""}"
//         >

//     `;

// }

// profileForm.addEventListener("submit", updateProfile);

// async function updateProfile(e) {

//     e.preventDefault();

//     const body = {

//         firstName: document.getElementById("firstName").value.trim(),

//         lastName: document.getElementById("lastName").value.trim(),

//         bio: document.getElementById("bio").value.trim(),

//         phone: document.getElementById("phone").value.trim(),

//         website: document.getElementById("website").value.trim(),

//         location: document.getElementById("location").value.trim(),

//     };

//     if (currentUser.role === "freelancer") {

//         body.title = document.getElementById("title").value.trim();

//         body.skills = document
//             .getElementById("skills")
//             .value
//             .split(",")
//             .map(skill => skill.trim())
//             .filter(skill => skill !== "");

//         body.experienceLevel = document.getElementById("experienceLevel").value;

//         body.hourlyRate = Number(
//             document.getElementById("hourlyRate").value
//         );

//         body.languages = document
//             .getElementById("languages")
//             .value
//             .split(",")
//             .map(language => language.trim())
//             .filter(language => language !== "");

//         body.resume = document.getElementById("resume").value.trim();

//     }

//     else {

//         body.companyName = document
//             .getElementById("companyName")
//             .value
//             .trim();

//         body.companyWebsite = document
//             .getElementById("companyWebsite")
//             .value
//             .trim();

//     }

//     try {

//         console.log(selectedProfilePicture);
//         if (selectedProfilePicture) {

//             const formData = new FormData();

//             formData.append(
//                 "profilePicture",
//                 selectedProfilePicture
//             );

//             const response = await fetch(
//                 `${API_URL}/upload/profile-picture`,
//                 {
//                     method: "POST",
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     body: formData
//                 }
//             );

//             console.log(response.status);
//             const data = await response.json();
//             console.log(data);
//             if (!response.ok) {
//                 console.log(data.message);
//                 return;
//             }
            
//             body.profilePicture = data.image.url;

//         }

//         const response = await fetch(`${API_URL}/profile`, {

//             method: "PUT",

//             headers: {

//                 "Content-Type": "application/json",

//                 Authorization: `Bearer ${token}`

//             },

//             body: JSON.stringify(body)

//         });

//         const data = await response.json();

//         if (!response.ok) {

//             alert(data.message);

//             return;

//         }

//         alert("Profile updated successfully!");

//         window.location.href = "index.html";

//     }

//     catch (err) {

//         console.error(err);

//         alert("Something went wrong while updating profile bro");

//     }

// }

//---------------new one from here -----------

const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const profileForm = document.getElementById("profileForm");


let currentUser = null;

let selectedProfilePicture = null;

let selectedResume = null;

let selectedPortfolio = null;



window.addEventListener(
    "DOMContentLoaded",
    loadProfile
);




// ================================
// LOAD PROFILE
// ================================

async function loadProfile(){


    try{


        const response = await fetch(
            `${API_URL}/profile`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        const data = await response.json();



        if(!response.ok){

            alert(data.message);

            return;

        }



        currentUser = data.user;


        renderForm(currentUser);


        initializeImageUpload();


        initializeDocumentUpload();



    }

    catch(err){

        console.log(err);

        alert(
            "Unable to load profile"
        );

    }


}





// ================================
// RENDER FORM
// ================================


function renderForm(user){


    profileForm.innerHTML="";


    renderCommonFields(user);



    if(user.role==="freelancer"){

        renderFreelancerFields(user);

    }

    else{

        renderClientFields(user);

    }



    renderSaveButton();


}




function renderSaveButton(){


    profileForm.innerHTML += `

        <button type="submit">
            Save Profile
        </button>

    `;


}





// ================================
// COMMON FIELDS
// ================================


function renderCommonFields(user){


profileForm.innerHTML += `


<div class="profile-picture-wrapper">


<img

id="profilePreview"

class="profile-picture"

src="${user.profilePicture || '/images/default-avatar.png'}"

/>



<input

type="file"

id="profilePictureInput"

accept="image/*"

hidden

>



<button

type="button"

id="changeProfilePicture"

>

Change Photo

</button>


</div>



<label>
First Name
</label>


<input

type="text"

id="firstName"

value="${user.firstName || ""}"

>




<label>
Last Name
</label>


<input

type="text"

id="lastName"

value="${user.lastName || ""}"

>




<label>
Bio
</label>


<textarea id="bio">

${user.bio || ""}

</textarea>





<label>
Phone
</label>


<input

type="text"

id="phone"

value="${user.phone || ""}"

>




<label>
Website
</label>


<input

type="text"

id="website"

value="${user.website || ""}"

>




<label>
Location
</label>


<input

type="text"

id="location"

value="${user.location || ""}"

>



`;

}





// ================================
// FREELANCER FIELDS
// ================================


function renderFreelancerFields(user){


profileForm.innerHTML += `


<h2>
Professional Information
</h2>



<label>
Professional Title
</label>


<input

type="text"

id="title"

value="${user.title || ""}"

>




<label>
Skills
</label>


<input

type="text"

id="skills"

value="${(user.skills || []).join(", ")}"

>




<label>
Experience Level
</label>


<select id="experienceLevel">


<option value="beginner"

${user.experienceLevel==="beginner"?"selected":""}>

Beginner

</option>



<option value="intermediate"

${user.experienceLevel==="intermediate"?"selected":""}>

Intermediate

</option>



<option value="expert"

${user.experienceLevel==="expert"?"selected":""}>

Expert

</option>


</select>




<label>
Hourly Rate
</label>


<input

type="number"

id="hourlyRate"

value="${user.hourlyRate || 0}"

>




<label>
Languages
</label>


<input

type="text"

id="languages"

value="${(user.languages || []).join(", ")}"

>




<label>
Resume
</label>


<input

type="file"

id="resumeInput"

accept=".pdf,.doc,.docx"

>


${user.resume ?

`
<a href="${user.resume}" target="_blank">
View Existing Resume
</a>
`

:""

}




<label>
Portfolio
</label>


<input

type="file"

id="portfolioInput"

accept=".pdf,.doc,.docx,.zip"

>



${user.portfolio ?

`
<a href="${user.portfolio}" target="_blank">
View Existing Portfolio
</a>
`

:""

}


`;

}





// ================================
// CLIENT FIELDS
// ================================


function renderClientFields(user){


profileForm.innerHTML += `


<h2>
Company Information
</h2>


<label>
Company Name
</label>


<input

type="text"

id="companyName"

value="${user.companyName || ""}"

>



<label>
Company Website
</label>


<input

type="text"

id="companyWebsite"

value="${user.companyWebsite || ""}"

>



`;

}





// ================================
// IMAGE UPLOAD
// ================================


function initializeImageUpload(){


const changeProfilePicture =
document.getElementById(
"changeProfilePicture"
);



const profilePictureInput =
document.getElementById(
"profilePictureInput"
);



changeProfilePicture.onclick = ()=>{

    profilePictureInput.click();

};



profilePictureInput.onchange=(e)=>{


const file=e.target.files[0];


if(!file)
return;



selectedProfilePicture=file;



const reader=new FileReader();



reader.onload=()=>{


document.getElementById(
"profilePreview"
).src=reader.result;


};



reader.readAsDataURL(file);



};


}





// ================================
// DOCUMENT UPLOAD
// ================================


function initializeDocumentUpload(){


const resumeInput =
document.getElementById(
"resumeInput"
);


const portfolioInput =
document.getElementById(
"portfolioInput"
);



if(resumeInput){


resumeInput.onchange=(e)=>{


selectedResume=e.target.files[0];


};


}




if(portfolioInput){


portfolioInput.onchange=(e)=>{


selectedPortfolio=e.target.files[0];


};


}



}






// ================================
// SUBMIT PROFILE
// ================================


profileForm.addEventListener(
"submit",
updateProfile
);




async function updateProfile(e){


e.preventDefault();



const body={


firstName:
document.getElementById("firstName").value.trim(),



lastName:
document.getElementById("lastName").value.trim(),



bio:
document.getElementById("bio").value.trim(),



phone:
document.getElementById("phone").value.trim(),



website:
document.getElementById("website").value.trim(),



location:
document.getElementById("location").value.trim()


};





if(currentUser.role==="freelancer"){


body.title =
document.getElementById("title").value.trim();



body.skills =
document.getElementById("skills")
.value
.split(",")
.map(x=>x.trim())
.filter(x=>x);



body.experienceLevel =
document.getElementById("experienceLevel")
.value;



body.hourlyRate =
Number(
document.getElementById("hourlyRate")
.value
);



body.languages =
document.getElementById("languages")
.value
.split(",")
.map(x=>x.trim())
.filter(x=>x);


}




else{


body.companyName =
document.getElementById("companyName")
.value.trim();



body.companyWebsite =
document.getElementById("companyWebsite")
.value.trim();



}




try{


// PROFILE IMAGE

if(selectedProfilePicture){


const formData=new FormData();


formData.append(
"profilePicture",
selectedProfilePicture
);



const res=await fetch(

`${API_URL}/upload/profile-picture`,

{

method:"POST",

headers:{
Authorization:`Bearer ${token}`
},

body:formData

}

);



const data=await res.json();



body.profilePicture =
data.image.url;


}






// RESUME

if(selectedResume){


const formData=new FormData();


formData.append(
"resume",
selectedResume
);



const res=await fetch(

`${API_URL}/upload/resume`,

{

method:"POST",

headers:{
Authorization:`Bearer ${token}`
},

body:formData

}

);



const data=await res.json();


body.resume=data.file.url;



}







// PORTFOLIO

if(selectedPortfolio){


const formData=new FormData();


formData.append(
"portfolio",
selectedPortfolio
);



const res=await fetch(

`${API_URL}/upload/portfolio`,

{

method:"POST",

headers:{
Authorization:`Bearer ${token}`
},

body:formData

}

);



const data=await res.json();



body.portfolio=data.file.url;



}







// UPDATE PROFILE


const response=await fetch(

`${API_URL}/profile`,

{

method:"PUT",

headers:{

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

},

body:JSON.stringify(body)

}

);




const data=await response.json();



if(!response.ok){


alert(data.message);

return;


}



alert(
"Profile updated successfully"
);



window.location.href="index.html";



}

catch(err){


console.log(err);


alert(
"Something went wrong while updating profile"
);


}



}