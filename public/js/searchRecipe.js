$(document).ready(function () {
    var currentURL = window.location.origin;
    let userQ;

    $(document).on('click', ".ingredient-1", function (event) {
        event.preventDefault();
        userQ = $("#user-input").val().trim();
        riskOption = $("#risk-factor").val().toLowerCase().trim();
        dietOption = $("#diet-factor").val().toLowerCase().trim();
        dietRestriction = $("#diet-restriction").val().toLowerCase().trim();
        $.ajax({
            url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&diet=${dietOption}`,
            method: "GET"
        }).done(function (response) {

            // we create indicators - we will target this 
            // in the for loop with <li> items
            let itemActive = $("#item-active");

            var activeImg = $("<img class='img-responsive'>").attr("src", response.hits[0].recipe.image);

            // let activeImg = $("<img src = 'response.hits[0].recipe.image' alt = 'recipe'>");

            itemActive.append(activeImg);

            let item = $("#item-one");

            var itemImg = $("<img class='img-responsive'>").attr("src", response.hits[1].recipe.image);

            // let itemImg = $("<img src = 'response.hits[1].recipe.image' alt = 'recipe'>");

            item.append(itemImg);

            console.log(response.hits[0].recipe.image);
            console.log(response.hits[1].recipe.image);



            // for (var i = 0; i < response.hits.length; i++) {

            // console.log(response.hits[i])
            // var row = $("<div class='col-md-4 recipe'>");
            // var img = $("<img class='img-responsive'>").attr("src", response.hits[i].recipe.image);
            // var recipeLink = $(`<a>`).attr("href", response.hits[i].recipe.url).text("Get Recipe");
            // row.append(img);
            // row.append("<p>" + response.hits[i].recipe.label + "</p>");
            // row.append(recipeLink);
            // $("#recipe-area").prepend(row);


            // }
        });
    });
});