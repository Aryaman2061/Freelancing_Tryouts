require("dotenv").config();

const https = require("https");

https.get("https://api.cloudinary.com", (res) => {
    console.log("Status:", res.statusCode);
}).on("error", (err) => {
    console.error(err);
});