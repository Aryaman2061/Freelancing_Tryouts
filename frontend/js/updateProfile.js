const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const profileForm = document.getElementById("profileForm");

let currentUser = null;

window.addEventListener("DOMContentLoaded", loadProfile);

async function loadProfile() {

    try {

        const response = await fetch(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        currentUser = data.user;

        renderForm(currentUser);

    }

    catch (err) {

        console.error(err);

        alert("Unable to load profile.");

    }

}

function renderForm(user) {

    profileForm.innerHTML = "";

    renderCommonFields(user);

    if (user.role === "freelancer") {

        renderFreelancerFields(user);

    }

    else {

        renderClientFields(user);

    }

    renderSaveButton();

}

function renderSaveButton() {

    profileForm.innerHTML += `
    
        <button type="submit">
            Save Profile
        </button>

    `;

}

function renderCommonFields(user) {

    profileForm.innerHTML += `

        <label>First Name</label>
        <input
            type="text"
            id="firstName"
            value="${user.firstName || ""}"
        >

        <label>Last Name</label>
        <input
            type="text"
            id="lastName"
            value="${user.lastName || ""}"
        >

        <label>Bio</label>
        <textarea
            id="bio"
        >${user.bio || ""}</textarea>

        <label>Phone</label>
        <input
            type="text"
            id="phone"
            value="${user.phone || ""}"
        >

        <label>Website</label>
        <input
            type="text"
            id="website"
            value="${user.website || ""}"
        >

        <label>Location</label>
        <input
            type="text"
            id="location"
            value="${user.location || ""}"
        >

        <label>Profile Picture</label>
        <input
            type="text"
            id="profilePicture"
            value="${user.profilePicture || ""}"
        >

        <label>Cover Picture</label>
        <input
            type="text"
            id="coverPicture"
            value="${user.coverPicture || ""}"
        >

    `;

}

function renderFreelancerFields(user) {

    profileForm.innerHTML += `

        <h2>Professional Information</h2>

        <label>Professional Title</label>
        <input
            type="text"
            id="title"
            value="${user.title || ""}"
        >

        <label>Skills</label>
        <input
            type="text"
            id="skills"
            value="${(user.skills || []).join(", ")}"
        >

        <label>Experience Level</label>

        <select id="experienceLevel">

            <option value="beginner"
                ${user.experienceLevel === "beginner" ? "selected" : ""}>
                Beginner
            </option>

            <option value="intermediate"
                ${user.experienceLevel === "intermediate" ? "selected" : ""}>
                Intermediate
            </option>

            <option value="expert"
                ${user.experienceLevel === "expert" ? "selected" : ""}>
                Expert
            </option>

        </select>

        <label>Hourly Rate</label>
        <input
            type="number"
            id="hourlyRate"
            value="${user.hourlyRate || 0}"
        >

        <label>Languages</label>
        <input
            type="text"
            id="languages"
            value="${(user.languages || []).join(", ")}"
        >

        <label>Resume</label>
        <input
            type="text"
            id="resume"
            value="${user.resume || ""}"
        >

    `;

}

function renderClientFields(user) {

    profileForm.innerHTML += `

        <h2>Company Information</h2>

        <label>Company Name</label>
        <input
            type="text"
            id="companyName"
            value="${user.companyName || ""}"
        >

        <label>Company Website</label>
        <input
            type="text"
            id="companyWebsite"
            value="${user.companyWebsite || ""}"
        >

    `;

}

profileForm.addEventListener("submit", updateProfile);

async function updateProfile(e) {

    e.preventDefault();

    const body = {

        firstName: document.getElementById("firstName").value.trim(),

        lastName: document.getElementById("lastName").value.trim(),

        bio: document.getElementById("bio").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        website: document.getElementById("website").value.trim(),

        location: document.getElementById("location").value.trim(),

        profilePicture: document.getElementById("profilePicture").value.trim(),

        coverPicture: document.getElementById("coverPicture").value.trim()

    };

    if (currentUser.role === "freelancer") {

        body.title = document.getElementById("title").value.trim();

        body.skills = document
            .getElementById("skills")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");

        body.experienceLevel = document.getElementById("experienceLevel").value;

        body.hourlyRate = Number(
            document.getElementById("hourlyRate").value
        );

        body.languages = document
            .getElementById("languages")
            .value
            .split(",")
            .map(language => language.trim())
            .filter(language => language !== "");

        body.resume = document.getElementById("resume").value.trim();

    }

    else {

        body.companyName = document
            .getElementById("companyName")
            .value
            .trim();

        body.companyWebsite = document
            .getElementById("companyWebsite")
            .value
            .trim();

    }

    try {

        const response = await fetch(`${API_URL}/profile`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);

            return;

        }

        alert("Profile updated successfully!");

        window.location.href = "index.html";

    }

    catch (err) {

        console.error(err);

        alert("Something went wrong.");

    }

}