const express = require("express");
const path = require("path");
const { engine } = require('express-handlebars');
const logger = require("./middleware/logger");
const memberRoutes = require("./routes/api/members");
const members = require("./Members");

// Init express object
const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Body Parser Middleware
app.use(express.json());

// Handle form submissions / form data
app.use(express.urlencoded({extended: false}));


// Home page route
app.get("/", (req, res) => res.render("index", {
    title: "Member App",
    members
}));


// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 5000; // If the app is deployed, chances are it will not run to port 5000.

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));