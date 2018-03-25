
$(document).ready(function () {
    console.log("ready!");

    var currentURL = window.location.origin;
    let userQ;

    $(document).on('click', ".ingredient-1", function (event) {
        alert('click!');
        event.preventDefault();

        userQ = $("#user-input").val().trim();
        console.log(userQ);

        $.ajax({
            url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=3&calories=591-722&Diet=low-carb`,
            method: "GET"
        }).done(function (response) {
            console.log(response.hits[1]);

            for (var i = 0; i < response.hits.length; i++) {

                var row = $("<div>");
                row.addClass("recipe");
                row.append("<p>" + response.hits[i].recipe.label + "</p>");
                row.append("<a href= " + response.hits[i].recipe.url + ">" + "Learn More" + "</a>");


                $("#recipe-area").prepend(row);

            }

        });
    });

});