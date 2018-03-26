$(document).ready(function () {
    let isModalShowing = false;
    const loginModal = $("#login-modal");
    $(function() {
        event.preventDefault();
        if(isModalShowing) return;
        isModalShowing = true;
        loginModal.attr("class", "modal fade in");
        loginModal.attr("style", "display: block");
    });
});


let isModalShowing = false;
const loginModal = $("#login-modal");
let userName;
let userId;

// Sets a listener for closing the modal and resetting parameters
$(".close").on("click", function(){
    $(".name-input").empty();
    $(".id-input").empty();
    loginModal.attr("class", "modal fade out");
    loginModal.attr("style", "display: none");
    isModalShowing = false;
});

$(".submit").on('click', function(event) {
    userName = $(".name-input").val().trim();
    userPw = $(".pw-input").val().trim();
    $.ajax({
        url: `/api/nutriModel/` + userName,
        method: "GET"
    }).done(function (response) {
        loginModal.attr("class", "modal fade out");
        loginModal.attr("style", "display: none");
        isModalShowing = false;
        //dynamically creates a display of the user's data
        response.forEach(element => {
            var row = $("<div>");
            row.addClass("patient-data");
            row.append("<p> Name: " + element.patient_name + "</p>");
            var recipeLink = $(`<a>`);
            recipeLink.attr({
                "href": element.fav_recipe,
                "target": "_blank"});
            recipeLink.text("This Recipe");
            var fav = $("<p> Favorite Recipe: " + "</p>");
            fav.append(recipeLink);
            row.append(fav);
            row.append("<p> Health Concerns: " + element.risk_factor + "</p>");
            row.append("<p> Dietary Recommendations: " + element.diet_option + "</p>");
            row.append("<p> Dietary Restrictions: " + element.diet_restriction + "</p>" + "<br>");
            $(".patient-info").append(row);
        });
    });
});


$(document).on('click', ".ingredient-1", function (event) {
    alert('click!');
    event.preventDefault();

    userQ = $("#user-input").val().trim();
    console.log(userQ);

    $.ajax({
        url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=3&calories=591-722&Diet=low-carb`,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.hits.length; i++) {
            console.log(response.hits[i])
            var row = $("<div class='recipe'>");
            var img = $("<img class='img responsive'>");
            img.attr("src", response.hits[i].recipe.image);
            // row.append("<a class='btn' href=" + response.hits[i].recipe.url + ">" + 'Get Recipe' + "</a>");
            var recipeLink = $(`<a>`);
            recipeLink.attr("href", response.hits[i].recipe.url);
            recipeLink.text("Get Recipe");
            var saveButton = $('<button class="btn btn default save-this">');
            var saveLink = response.hits[i].recipe.url;
            saveButton.attr("id", saveLink);
            saveButton.text("Save This!");
            row.append(saveButton);
            row.append(img);
            row.append("<p>" + response.hits[i].recipe.label + "</p>");
            row.append(recipeLink);
            $("#recipe-area").prepend(row);
        }
    });

    $(".save-this").on('click', function(event){
        recipe = event.currentTarget.id;
        console.log(recipe);
        console.log("hello!");
        alert("poopoo");
    })
});