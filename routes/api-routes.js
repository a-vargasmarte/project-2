var path = require("path");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/main-page.html"));
    });


    app.get("/api/recipes", function (req, res) {
        console.log("got it");
        console.log(req.query.query);
        res.send("poopoo");

    });

};