function calculateMatch(userAnswers) {
    // Compare method here
    console.log(userAnswers);
    compare(userAnswers);
    // And post the user's data to the friends api page
    $.post("api/friends", userAnswers);
};

function compare(userData) {
    $.get("/api/friends", function (data) {
        let lowestDifference = 100;
        let chosenFriend = null;
        // Cycle through each object received in the data array
        data.forEach((potentialPick) => {
            // Reset difference total each iteration
            let differenceTotal = 0;

            console.log(potentialPick)

            // Cycle through the scores of the current data piece, and calculate the difference
            potentialPick.scores.forEach((score, i) => {
                differenceTotal += Math.abs(score - userData.scores[i]);
            });

            // If the difference is a new record and they aren't the same name...
            if (differenceTotal < lowestDifference && potentialPick.name != userData.name) {
                // Set the new record and record the potential match
                lowestDifference = differenceTotal;
                chosenFriend = potentialPick;
            };
        });
        displayResults(chosenFriend, lowestDifference);
    });
};

function displayResults(chosenFriend, matchScore) {

    $(".nav-button").addClass("inverse");

    matchScore = 100 - matchScore;

    const page = $("#survey-body");

    const resutlsOverlay = $(`<div id="results-overlay">`);

    const resultsContainer = $(`<div id="results-container" class="gradient-bg">
        <div>
            <h1 class="results-h1">found a friend!</h1>
            <p class="results-p">You would be good friends with:</p>
        </div>
        <div id="results-display">
            <h1>${chosenFriend.name}</h1>
            <img src="${chosenFriend.photo}" alt="${chosenFriend.name}" class="results-img" onerror="this.onerror=null;this.src='http://via.placeholder.com/200'">
            <p class="results-p">Your match score is ${matchScore} points!</p>
            <a href="/"><button id="home-results-button" class="button">Home</button></a>
        </div>
    </div>`);
    resutlsOverlay.append(resultsContainer);

    page.append(resutlsOverlay);
}