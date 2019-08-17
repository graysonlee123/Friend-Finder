$("#submit-button").on("click", function (e) {
    e.preventDefault();
    calculateMatch();
})

function calculateMatch() {
    const name = $("#name-input").val();
    const photo = $("#photo-url-input").val();
    
    const scores = [];
    $(".dropdown").each( function (index) {
        const value = $(this).val();
        scores.push($(this).val() || 0);
    });

    const userAnswers = {
        name: name,
        photo: photo,
        scores: scores
    }

    // Compare method here

    $.post("api/friends", userAnswers);
}