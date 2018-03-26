$(document).ready(function () {
    console.log("patient-manager working!");
    var patientList = $(".patient-container");
    var patientContainer = $(".patient-container");
    var currentURL = window.location.origin;

    $(document).on('click', ".add-patient", function (event) {
        alert('patient added!');
        event.preventDefault();

        patientName = $("#patient-name").val().trim();
        riskOption = $("#risk-factor").val().toLowerCase().trim();
        dietOption = $("#diet-factor").val().toLowerCase().trim();
        dietRestriction = $("#diet-restriction").val().toLowerCase().trim();
        console.log(patientName);
        console.log(riskOption);
        console.log(dietOption);
        console.log(dietRestriction);

        addNewPatient();

    });


    function addNewPatient(event) {
        if (!patientName) {
            return;
        }

        createPatient({
            patient_name: patientName,
            fav_recipe: "",
            diet_option: dietOption,
            risk_factor: riskOption,
            diet_restriction: dietRestriction,

        });
    }


    function createPatient(patientInfo) {
        $.post("/api/patient", patientInfo)
            .then(getPatients);
    }

    function createPatientRow(patientData) {
        console.log(patientData);
        // var newTr = $("<tr>");
        // newTr.data("patient", patientData);
        // newTr.append("<td>" + patientData.patient_name + "</td>");
        // return newTr;

        var newDiv = $("<div>");
        newDiv.data("patient", patientData);
        newDiv.append("<div>" + patientData.patient_name + "</div>");
        newDiv.append("<div>" + patientData.risk_factor + "</div>");
        newDiv.append("<div>" + patientData.diet_restriction + "</div>");
        newDiv.append("<br>");

        return newDiv;
    }


    function getPatients() {
        $.get("/api/patient", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createPatientRow(data[i]));
            }
            renderPatients(rowsToAdd);
        });
    }

    function renderPatients(rows) {
        if (rows.length) {
            console.log(rows);
            patientList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create a Patient before you can create a Post.");
        patientContainer.append(alertDiv);
    }

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

    $("#save-this").on('click', function(event){
        character = event.currentTarget.id;
    })


});


        //     $.ajax({
        //         url: `https://api.edamam.com/search?q=${userQ}&app_id=76461587&app_key=b829a690de0595f2fa5b7cb02db4cd99&from=0&to=3&calories=591-722&Diet=low-carb`,
        //         method: "GET"
        //     }).done(function (response) {
        //         console.log(response.hits[1]);
        //         for (var i = 0; i < response.hits.length; i++) {
        //             var row = $("<div>");
        //             row.addClass("recipe");
        //             row.append("<p>" + response.hits[i].recipe.label + "</p>");
        //             row.append("<a href= " + response.hits[i].recipe.url + ">" + "Learn More" + "</a>");
        //             $("#recipe-area").prepend(row);
        //         }
        //     });