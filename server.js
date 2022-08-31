// Import npm packages
const express = require('express');
const jsonwebtoken = require("jsonwebtoken")
const fs = require("fs")

// setting global key variable to use in jsonwebtoken

let signingKey = fs.readFileSync("signingKey.p8").toString()

const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 8080

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting cors so our react app can call our server

app.use(cors())

// Function to generate Paragon User Token with a JWT library, using a user ID and the 
// Paragon Signing Key (stored in envirnoment variables

function generateParagonUserToken(userId) {
    const createdAt = Math.floor(Date.now() / 1000);
    return jsonwebtoken.sign(
        {
            sub: userId,
            iat: createdAt,
            exp: createdAt + 60 * 60,
        },
        signingKey,
        { algorithm: "RS256" }
    );
}

// This function might use a session identifier to find a logged-in user and
// return their user details. Here, we use a static value for the demo.
function getLoggedInUser() {
    const user = {
        id: "1f45e694-977a-474c-b630-da5c7839ad94",
        name: "Andrew Murphy",
    };
    user.paragonUserToken = generateParagonUserToken(user.id);
    return user;
}


app.use((req, res, next) => {
    req.user = getLoggedInUser()
    next()
});

// Accessing our routes

const routes = require("./api")
app.use('/', routes);

// Tell the user which port app is running on when successfully up and running.
app.listen(PORT, console.log(`Server is starting at ${PORT}`))