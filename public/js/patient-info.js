
$(document).ready(function () {
    console.log("ready!");
    $(function() {
        $.ajax({
            url: `/api/nutriModel`,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var row = $("<div>");
            row.addClass("patient-data");
            row.append("<p> Name: " + response[0].patient_name + "</p>");
            row.append("<p> Favorite Recipe: " + response[0].fav_recipe + "</p>");
            row.append("<p> Health Concerns: " + response[0].diet + "</p>");
            row.append("<p> Allergies: " + response[0].health + "</p>");
            $(".patient-info").append(row);
        });
    });
});