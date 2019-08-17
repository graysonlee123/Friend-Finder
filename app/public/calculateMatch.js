$("#submit-button").on("click", function (e) {
    e.preventDefault();
    calculateMatch();
});

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
    compare(userAnswers);

    $.post("api/friends", userAnswers);
};

function compare(userData) {
    $.get("/api/friends", function(data) {
        let lowestDifference = 100000;
        let chosenFriend = null;
        // Cycle through each object received in the data array
        data.forEach( (potentialPick, i) => {
            // Reset difference total each iteration
            let differenceTotal = 0;

            // Cycle through the scores of the current data piece, and calculate the difference
            potentialPick.scores.forEach( (score, i) => {
                differenceTotal += Math.abs(score - userData.scores[i]);
            });

            if (differenceTotal < lowestDifference && potentialPick.name != userData.name) {
                lowestDifference = differenceTotal;
                chosenFriend = potentialPick;
            }
        });
        console.log(chosenFriend.name);
        modal(chosenFriend);
    });
};

function modal(match) {
    console.log(`From modal:`);
    console.log(match);
}