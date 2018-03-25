const db = require('../models');
const path = require("path");

module.exports = (app) => {
    app.get("/", function (req, res) {
        console.log("getting");
        res.render("index");
    });
};