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
