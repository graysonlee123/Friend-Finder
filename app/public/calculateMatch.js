$("#submit-button").on("click", function (e) {
    e.preventDefault();
    calculateMatch();
})

function calculateMatch() {
    const name = $("#name-input").val();
    const photo = $("#photo-url-input").val();
    const scores = [];

    console.log($(".dropdown"));

    $(".dropdown").each( function (index) {
        scores.push($(this).val() );
    });

    scores.push();

    const userAnswers = {
        name: name,
        photo: photo,
        scores: scores
    }

    $.post("api/friends", userAnswers);
    
    console.log(scores);
}