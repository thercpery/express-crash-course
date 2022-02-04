const moment = require("moment")

const logger = (req, res, next) => {
    // console.log("Hello");
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format()}`); // Get API location
    next();
};

module.exports = logger;