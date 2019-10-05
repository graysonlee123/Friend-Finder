// Set some variables
let questions;

const options = [
    'Strongly agree',
    'Agree',
    'Neutral',
    'Disagree',
    'Strongly disagree'
];

// Survey functions
const survey = {
    async fetchAndDisplayQuestions() {
        const questions = await $.getJSON('/data/questions.json').catch(() => {
            console.log('There was an error loading in questions.json!');
        });
    
        if (questions) {
            this.generateSurvey(questions);
        }
    },

    generateSurvey(questions) {
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
            const $options = $(`<select name="question-${i}" value="0" id="question-${i}" class="dropdown">`);
            
            $label.append($(`<h2>Question ${i + 1}</h2>`), $(`<p>${question.question}</p>`));
    
            options.forEach((option, i) => {
                if (option === "Neutral") $options.append($(`<option value="${i}" selected>${option}</option>`));
                else $options.append($(`<option value="${i}">${option}</option>`));
            });
    
            $container.append($label);
            $container.append($options);
    
            $questions.append($container);
        });
    },

    calculateMatch() {
        console.log("hello");
    },

    badInputFeedback(elementId) {
        console.log(elementId);
    },

    async gatherAndPushResults() {
        const scores = [];
        const body = {};

        $('.dropdown').each(function() {
            scores.push($(this).val() || '0');
        });

        body.scores = scores;
        body.name = 'bob';

        const postData = await $.ajax({
            url: '/api/friends',
            method: 'POST',
            data: body
        })
        .catch(err => console.log("Error posting scores!", err));

        if (postData) {
            console.log('pushed! calculating match...');
            this.calculateMatch(postData);
        }
    },

    async calculateMatch(postedFriend) {
        const potentialFriends = await $.ajax({
            url: '/api/friends',
            method: 'GET'
        }).catch(err => console.log('error fetching all friends!', err));

        if (potentialFriends) {
            console.log(potentialFriends, postedFriend, 'calculating match...');
            let lowestDifference = 100;
            let bestMatch;

            potentialFriends.forEach(potentialFriend => {
                if (potentialFriend._id === postedFriend.body._id) return console.log('ignoring match!');

                let differenceTotal = 0;

                potentialFriend.scores.forEach((score, i) => {
                    differenceTotal += Math.abs(score - postedFriend.body.scores[i]);
                });

                if (differenceTotal < lowestDifference) {
                    lowestDifference = differenceTotal;
                    bestMatch = potentialFriend;
                }
            });

            document.location.href = `/results?userId=${postedFriend.body._id}&matchId=${bestMatch._id}`
        }
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

// function displayResults(chosenFriend, matchScore) {

//     matchScore = 100 - matchScore;

//     const page = $("#survey-body");

//     const resutlsOverlay = $(`<div id="results-overlay">`);

//     const resultsContainer = $(`<div id="results-container" class="gradient-bg">
//         <div>
//             <h1 class="results-h1">found a friend!</h1>
//             <p class="results-p">You would be good friends with:</p>
//         </div>
//         <div id="results-display">
//             <h1 class="results-h1">${chosenFriend.name}</h1>
//             <div class="dispaly-img-container">
//                 <img src="${chosenFriend.photo}" alt="${chosenFriend.name}" class="results-img" onerror="this.onerror=null;this.src='http://via.placeholder.com/200'">
//             </div>
//             <p>Your match score is ${matchScore} points!</p>
//             <a href="/" class="button">Home</a>
//         </div>
//     </div>`);
//     resutlsOverlay.append(resultsContainer);

//     page.append(resutlsOverlay);
// }

const nameInputContainer = $("#required-name-input");
const photoInputContainer = $("#required-photo-url-input");

let nameValue = null;
let photoValue = null;

let validImage = false;
let validName = false;

function buildUserObj() {
    const scores = [];

    $(".dropdown").each(function (index) {
        const value = $(this).val();
        scores.push($(this).val() || 0);
    });

    return {
        name: nameValue,
        photo: photoValue,
        scores: scores
    }
}

function highlightNameField() {
    nameInputContainer.addClass("red");
}

function refreshFieldHighlights() {
    nameInputContainer.removeClass("red");
    photoInputContainer.removeClass("red");
}

function scroll() {
    $("html, body").animate({ scrollTop: $('#survey-div').offset().top }, 1000);
}

function checkInputs() {
    nameValue = $("#name-input").val();

    if (!nameValue) {
        highlightNameField();
        scroll();
        return false;
    } else {
        return true;
    }
}

// Run on page load
survey.fetchAndDisplayQuestions();

// Event listeners
$(document).on('click', '#submit-button', function (e) {
    e.preventDefault();
    survey.gatherAndPushResults();
    // if (checkInputs()) calculateMatch(buildUserObj());
});