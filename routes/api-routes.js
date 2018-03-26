var path = require("path");
const db = require("../models")

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/main-page.html"));
    });


    // app.get("/api/recipes", function (req, res) {
    //     console.log("got it");
    //     console.log(req.query.query);
    //     res.send("poopoo");

    // });

    app.get("/api/nutriModel", function (req, res) {
        db.nutriModel.findAll({})
        .then(nutriModel => {
            console.log(nutriModel.map(x => x.dataValues));
            res.send(nutriModel.map(x => x.dataValues));
        })
    });

};