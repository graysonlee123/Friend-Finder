// Set some variables
let questions;

const options = [
    'Strongly agree',
    'Agree',
    'Neutral',
    'Disagree',
    'Strongly disagree'
];

// Run on page load
fetchAndDisplayQuestions();

// Survey functions
async function fetchAndDisplayQuestions() {
    const questions = await $.getJSON('/data/questions.json').catch(() => {
        console.log('There was an error loading in questions.json!');
    });

    if (questions) {
        generateSurvey(questions);
    }
}

function calculateMatch(userAnswers) {
    // Compare method here
    console.log(userAnswers);
    compare(userAnswers);
    // And post the user's data to the friends api page
    $.post("api/friends", userAnswers);
}

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
}

function displayResults(chosenFriend, matchScore) {

    matchScore = 100 - matchScore;

    const page = $("#survey-body");

    const resutlsOverlay = $(`<div id="results-overlay">`);

    const resultsContainer = $(`<div id="results-container" class="gradient-bg">
        <div>
            <h1 class="results-h1">found a friend!</h1>
            <p class="results-p">You would be good friends with:</p>
        </div>
        <div id="results-display">
            <h1 class="results-h1">${chosenFriend.name}</h1>
            <div class="dispaly-img-container">
                <img src="${chosenFriend.photo}" alt="${chosenFriend.name}" class="results-img" onerror="this.onerror=null;this.src='http://via.placeholder.com/200'">
            </div>
            <p>Your match score is ${matchScore} points!</p>
            <a href="/" class="button">Home</a>
        </div>
    </div>`);
    resutlsOverlay.append(resultsContainer);

    page.append(resutlsOverlay);
}

function generateSurvey(questions) {
    const $textFields = $('#info-container');
    const $questions = $('#questions-container');

    $textFields.append(
        `<div class="text-input-box survey-row">
            <label for="name-input" class="label required-field"><h2 id="required-name-input">Name</h2></label>
            <input type="text" id="name-input" class="text-input" placeholder="Johnny Appleseed">
        </div>`
    );

    questions.forEach((question, i) => {
        const $container = $(`<div class="question-box survey-row">`);
        const $label = $(`<label for="question-${i}" class="label">`);
        const $options = $(`<select name="question-${i}" id="question-${i}" class="dropdown">`);
        
        $label.append($(`<h2>Question ${i + 1}</h2>`), $(`<p>${question.question}</p>`));

        options.forEach((option, i) => {
            if (option === "Neutral") $options.append($(`<option value="${i}" selected>${option}</option>`));
            else $options.append($(`<option value="${i}">${option}</option>`));
        });

        $container.append($label);
        $container.append($options);

        $questions.append($container);
    });
}