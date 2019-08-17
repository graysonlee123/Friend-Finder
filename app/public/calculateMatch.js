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

            console.log(`${potentialPick.name} compare to ${userData.name}`)

            // Cycle through the scores of the current data piece, and calculate the difference
            potentialPick.scores.forEach( (score, i) => {
                differenceTotal += Math.abs(score - userData.scores[i]);
            });

            if (differenceTotal < lowestDifference && potentialPick.name != userData.name) {
                lowestDifference = differenceTotal;
                chosenFriend = potentialPick;
            };
        });
        console.log(chosenFriend.name);
        displayResults(chosenFriend, lowestDifference);
    });
};

function displayResults(chosenFriend, matchScore) {

    matchScore = 100 - matchScore;

    const page = $("#survey-body");

    const resutlsOverlay = $(`<div id="results-overlay">`);

    const resultsContainer = $(`<div id="results-container" class="gradient-bg">
        <div>
            <h1 class="results-h1">it's a match!</h1>
            <p class="results-p">You were matched with:</p>
        </div>
        <div id="results-display">
            <h1>${chosenFriend.name}</h1>
            <img src="${chosenFriend.photo}" alt="${chosenFriend.name}" class="results-img">
            <p class="results-p">Your match score is ${matchScore} points!</p>
            <a href="/"><button id="home-results-button" class="button">Home</button></a>
        </div>
    </div>`);
    resutlsOverlay.append(resultsContainer);

    page.append(resutlsOverlay);
}