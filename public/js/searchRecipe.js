$(document).ready(function () {
    console.log("ready!");

    let userQ;

    $('.ingredient-1').on('click', function (event) {
        // alert('click!');
        event.preventDefault();

        userQ = $("#user-input").val().trim();
        // console.log(userQ);

        $.ajax({
            url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=3&calories=591-722&Diet=low-carb`,
            method: "GET"
        }).done(function (response) {
            // console.log(response.hits[0].recipe.label);

            for (var i = 0; i < response.hits.length; i++) {

                var row = $("<div>");
                row.addClass("recipe");
                row.append("<p>" + response.hits[i].recipe.label + "</p>");

                $("#recipe-area").prepend(row);

            }

        });
    });

});



// var user;
// var ingredient = [];
// var calories = [];
// var diet = [];
// var health = [];

// $(function () {
// function getFoodInfo(WhatTheCallerSaysTheFoodIs) {

// }





    // $(function () {
    //     $(".ingredient-1").on("click", function (event) {

    //         $.ajax({
    //             url: `https://api.edamam.com/search?q=chicken&app_id=de3dbbb9&app_key=6634bfb343a14731acccaea9e1d029bd&from=0&to=3&calories=591-722&Diet=low-carb`,
    //             method: "GET"
    //         }).done(function (response) {
    //             console.log(response);
    //         });

    //     });
    // });



    // getFoodInfo();

    // });
