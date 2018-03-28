$(document).ready(function () {
    let isModalShowing = false;
    const loginModal = $("#login-modal");
    $(function () {
        event.preventDefault();
        if (isModalShowing) return;
        isModalShowing = true;
        loginModal.attr({
            "class": "modal fade in",
            "style": "display: block"
        });
    });
});

const loginModal = $("#login-modal");
let isModalShowing = false;
let userName;
let userPw;
let thisId;
let riskOption;
let dietOption;
let dietRestriction;
let nextSlide = 0;

// Sets a listener for closing the modal and resetting parameters
$(".close").on("click", function () {
    $(".name-input").empty();
    $(".id-input").empty();
    loginModal.attr({
        "class": "modal fade out",
        "style": "display: none"
    });
    isModalShowing = false;
});

$(".submit").on('click', function (event) {
    userName = $(".name-input").val().trim();
    userPw = $(".pw-input").val().trim();
    $.ajax({
        url: `/api/nutriModel/` + userName,
        method: "GET"
    }).done(function (response) {
        loginModal.attr({
            "class": "modal fade out",
            "style": "display: none"
        });
        isModalShowing = false;
        //dynamically creates a display of the user's data
        response.forEach(element => {
            console.log(element);
            var row = $("<div>");
            row.addClass("patient-data");
            row.append("<p> Name: " + element.patient_name + "</p>");
            row.append("<p> Health Concerns: " + element.risk_factor + "</p>");
            row.append("<p> Dietary Recommendations: " + element.diet_option + "</p>");
            row.append("<p> Dietary Restrictions: " + element.diet_restriction + "</p>");
            var recipeLink = $(`<a>`);
            recipeLink.attr({
                "href": element.fav_recipe,
                "target": "_blank"
            });
            recipeLink.text("This Recipe");
            var fav = $("<p> Favorite Recipe: " + "</p>" + "<br>");
            fav.append(recipeLink);
            row.append(fav);

            $(".patient-info").append(row);
            thisId = element.id;
            riskOption = element.risk_factor.toLowerCase().trim();
            dietOption = element.diet_option.toLowerCase().trim();
            dietRestriction = element.diet_restriction.toLowerCase().trim();
        });
    });
});

let responseObject;
let id;
$(document).on('click', ".ingredient-1", function (event) {
    event.preventDefault();
    userQ = $("#user-input").val().trim();
    console.log(userQ);
    $.ajax({
        url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=5&calories=591-722&Diet=${riskOption}&Health=${dietOption}`,
        method: "GET"
    }).done(function (response) {

        responseObject = response;
        console.log(response);
        console.log(responseObject);

        // we create indicators - we will target this 
        // in the for loop with <li> items
        let itemActive = $("#item-active");

        var activeImg = $("<img>").attr({
            "src": response.hits[0].recipe.image,
            "data-id": 0,
            "class": "img-responsive"
        });


        // let activeCaption = $("<h3>").text(response.hits[0].recipe.label);

        var activeCaption = $(`<a>`);
        activeCaption.attr({
            "href": response.hits[0].recipe.url,
            "class": "btn btn-info",
            "role": "button"

        });
        activeCaption.text(response.hits[0].recipe.label);

        var saveLink = response.hits[0].recipe.uri;

        // make function
        var addFavBttn = $("<a>");
        addFavBttn.addClass("btn btn default fav-this");
        addFavBttn.attr({
            "id": saveLink,
            "class": "btn btn-info",
            "role": "button"
        });
        addFavBttn.text("Fave This!");


        // make function
        var addSaveBttn = $("<a>");
        addSaveBttn.addClass("btn btn default save-this");
        addSaveBttn.attr({
            "id": saveLink,
            "class": "btn btn-info",
            "role": "button"
        });
        addSaveBttn.text("Save This!");



        // let activeImg = $("<img src = 'response.hits[0].recipe.image' alt = 'recipe'>");
        itemActive.append(activeCaption);
        itemActive.append(activeImg);

        itemActive.append(addSaveBttn);

        itemActive.append(addFavBttn);



        $('.carousel').carousel("pause");

        $("#panel-slider").show();


        console.log(response.hits[0].recipe.image);
        console.log(response.hits[1].recipe.image);
        // start of plotly code
        id = 1;

        createPlots(responseObject, 0);




        // let arrayDigest = response.hits[1].recipe.digest;
        // let reciYield = response.hits[1].recipe.yield;
        // let servingArray = [];
        // let firstPlot = {
        //     values: [],
        //     labels: []
        // };
        // let secondPlot = {
        //     values: [],
        //     labels: []
        // }

        // let thirdPlot = {
        //     x: [],
        //     y: [],
        //     marker: {
        //         color: ['#64609A', '#933709', '#14A989', '#469A84', '#D05340', '#436CB9', '#469496', '#3AA8C1', '#353839', '#ABAD48', '#B07080', '#BD559C', '#AA4069', '#2D5DA1', '#832A0D', '#B56917', '#E97451', '#C62D42']
        //     }
        // }
        // // arrayDigest.contains("")
        // arrayDigest.forEach(nutrient => {
        //     // console.log(nutrient);
        //     // push nutrient servings for each nutrient
        //     if (nutrient.label === "Fat" || nutrient.label === "Carbs" || nutrient.label === "Protein") {
        //         firstPlot.values.push(nutrient.total / reciYield);
        //         firstPlot.labels.push(nutrient.label);

        //         if (nutrient.label === "Fat") {
        //             nutrient.sub.forEach(fat => {

        //                 secondPlot.values.push(fat.total / reciYield);
        //                 secondPlot.labels.push(fat.label);
        //             })

        //         }
        //     }

        //     else if (nutrient.label != "Cholesterol" & nutrient.label != "Folate equivalent (total)" & nutrient.label != "Folate (food)") {
        //         thirdPlot.x.push(nutrient.daily / reciYield);
        //         thirdPlot.y.push(nutrient.label);

        //     }

        // });
        // console.log(secondPlot);
        // // console.log(plotObject);

        // // process nutrition data
        // let totalNutrients = response.hits[1].recipe.digest;

        // // calculate totalNutrient per serving for our recipe
        // for (var key in totalNutrients) {
        //     if (totalNutrients.hasOwnProperty(key)) {
        //         var val = totalNutrients[key];
        //         var perServing = val.quantity / 8;

        //     }
        // }


        // // populate the website with beautiful plots
        // var data = [{
        //     values: firstPlot.values,
        //     labels: firstPlot.labels,
        //     domain: {
        //         x: [0, .48]
        //     },
        //     name: 'GHG Emissions',
        //     hoverinfo: 'label+percent+name',
        //     hole: .4,
        //     type: 'pie'
        // }, {
        //     values: secondPlot.values,
        //     labels: secondPlot.labels,
        //     text: 'CO2',
        //     textposition: 'inside',
        //     domain: { x: [.52, 1] },
        //     name: 'CO2 Emissions',
        //     hoverinfo: 'label+percent+name',
        //     hole: .4,
        //     type: 'pie'
        // }];

        // var layout = {
        //     title: 'Macros and Fat Distribution',
        //     legend: {
        //         "orientation": "h"
        //     },
        //     height: 375,
        //     width: 550,
        //     grid: {
        //         ygap: 0.8
        //     }
        // };


        // Plotly.newPlot('tester', data, layout);

        // var data2 = [{
        //     type: 'bar',
        //     x: thirdPlot.x,
        //     y: thirdPlot.y,
        //     orientation: 'h',
        //     marker: {
        //         color: thirdPlot.marker.color,
        //         line: {
        //             color: 'black',
        //             width: 1
        //         }
        //     }
        // }];

        // var layout2 = {
        //     // remember to change to nutrient density!
        //     title: '% from daily requirements by serving',
        //     height: 450,
        //     width: 800,
        //     xaxis: {
        //         title: '%',
        //     },
        //     yaxis: {
        //         title: 'Vitamins and minerals',
        //         automargin: true
        //     }

        // };

        // Plotly.newPlot('tester-2', data2, layout2);





        // populate our slider with text content

        for (let i = 1; i < response.hits.length; i++) {
            console.log(response.hits[i])

            let itemDiv = $("<div>").attr({
                class: "item",
                "data-id": i
            });


            var itemImg = $("<img>").attr({
                "src": response.hits[i].recipe.image,
                "id": "image" + i,
                "class": "img-responsive"
            });

            var itemCaption = $(`<a>`);
            itemCaption.attr({
                "href": response.hits[i].recipe.url,
                "class": "btn btn-info",
                "role": "button"
            });
            itemCaption.text(response.hits[i].recipe.label);


            var saveLink = response.hits[i].recipe.uri;

            // make function
            var addFavBttn = $("<a>");
            // addFavBttn.addClass("btn btn default fav-this");
            addFavBttn.attr({
                "id": saveLink,
                "class": "btn btn-info fav-this",
                "role": "button"
            });
            addFavBttn.text("Fave This!");


            // make function
            var addSaveBttn = $("<a>");
            // addSaveBttn.addClass("btn btn default save-this");
            addSaveBttn.attr({
                "id": saveLink,
                "class": "btn btn-info save-this",
                "role": "button"
            });
            addSaveBttn.text("Save This!");

            itemDiv.append(itemCaption);
            itemDiv.append(itemImg);

            itemDiv.append(addSaveBttn);

            itemDiv.append(addFavBttn);

            $("#item-list").append(itemDiv);


        }

        // let activeDiv = $(".item active");
        console.log($(`#item-active`).hasClass("active"));

        $(".right").on('click', function (event) {
            console.log('right clicked modafoca!');

            nextSlide++;

            if (nextSlide > 4) {
                nextSlide = 0;
                createPlots(responseObject, nextSlide);
            }

            // console.log(nextSlide);
            createPlots(responseObject, nextSlide);
        });

        $(".left").on('click', function (event) {
            console.log('right clicked modafoca!');

            nextSlide--;
            if (nextSlide < 0) {
                nextSlide = 4;
                createPlots(responseObject, nextSlide);
            }

            // console.log(nextSlide);
            createPlots(responseObject, nextSlide);
        });

        // $("#0").addClass("active");

        $(".fav-this").on('click', function (event) {
            uri = event.currentTarget.id;
            console.log(uri);
            console.log(thisId);
            var id = thisId;
            $.ajax({
                url: "api/patient/fav-recipe/" + id,
                method: "PUT",
                data: { fav_recipe: uri }
            }).done(function (response) {
                console.log(response);
            });

        });

        $(".save-this").on('click', function (event) {
            uri = event.currentTarget.id;
            console.log(uri);
            console.log(thisId);
            var id = thisId;
            $.ajax({
                url: "api/patient/save-recipe/" + id,
                method: "POST",
                data: { save_recipe: uri }
            }).done(function (response) {
                console.log(response);
            });
        });
    });

});

function createPlots(response, i) {
    let arrayDigest = response.hits[i].recipe.digest;
    let reciYield = response.hits[i].recipe.yield;

    let servingArray = [];
    let firstPlot = {
        values: [],
        labels: []
    };
    let secondPlot = {
        values: [],
        labels: []
    }

    let thirdPlot = {
        x: [],
        y: [],
        marker: {
            color: ['#64609A', '#933709', '#14A989', '#469A84', '#D05340', '#436CB9', '#469496', '#3AA8C1', '#353839', '#ABAD48', '#B07080', '#BD559C', '#AA4069', '#2D5DA1', '#832A0D', '#B56917', '#E97451', '#C62D42']
        }
    }

    arrayDigest.forEach(nutrient => {
        // console.log(nutrient);
        // push nutrient servings for each nutrient
        if (nutrient.label === "Fat" || nutrient.label === "Carbs" || nutrient.label === "Protein") {
            firstPlot.values.push(nutrient.total / reciYield);
            firstPlot.labels.push(nutrient.label);

            if (nutrient.label === "Fat") {
                nutrient.sub.forEach(fat => {

                    secondPlot.values.push(fat.total / reciYield);
                    secondPlot.labels.push(fat.label);
                })

            }
        }

        else if (nutrient.label != "Cholesterol" & nutrient.label != "Folate equivalent (total)" & nutrient.label != "Folate (food)") {
            thirdPlot.x.push(nutrient.daily / reciYield);
            thirdPlot.y.push(nutrient.label);

        }

    });
    console.log(secondPlot);
    // console.log(plotObject);

    // process nutrition data
    let totalNutrients = response.hits[1].recipe.digest;

    // calculate totalNutrient per serving for our recipe
    for (var key in totalNutrients) {
        if (totalNutrients.hasOwnProperty(key)) {
            var val = totalNutrients[key];
            var perServing = val.quantity / 8;

        }
    }


    // populate the website with beautiful plots
    var data = [{
        values: firstPlot.values,
        labels: firstPlot.labels,
        domain: {
            x: [0, .48]
        },
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
    }, {
        values: secondPlot.values,
        labels: secondPlot.labels,
        text: 'CO2',
        textposition: 'inside',
        domain: { x: [.52, 1] },
        name: 'CO2 Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
    }];

    var layout = {
        title: 'Macros and Fat Distribution',
        legend: {
            "orientation": "h"
        },
        height: 375,
        width: 550,
        grid: {
            ygap: 0.8
        }
    };


    Plotly.newPlot('tester', data, layout);

}