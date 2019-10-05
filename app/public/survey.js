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