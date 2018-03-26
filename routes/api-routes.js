var path = require("path");
var db = require("../models");


module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/main-page.html"));
    });


    app.get("/api/recipes", function (req, res) {
        console.log("got it");
        console.log(req.query.query);
        res.send("poopoo");

    });



    app.post("/api/patient", function (req, res) {
        // Create an Author with the data available to us in req.body
        console.log("adding to the database");
        console.log(req.body);
        db.nutriModel.create(req.body).then(function (dbPatients) {
            res.json(dbPatients);
        });
    });

    app.get("/api/patient", function (req, res) {
        console.log("finding all");
        db.nutriModel.findAll({}).then(function (dbPatients) {
            res.json(dbPatients);
        });
    });

};