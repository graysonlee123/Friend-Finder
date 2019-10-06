// Set some variables
let questions;
let profileImage;

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
            const $questions = $('#questions-container');
    
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
        }
    },

    clearLabels() {
        $('.label.required-field').children('h2').each(function() {
            $(this).attr('data-content', 'Required');
            $(this).css('color', 'inherit');
        });
    },

    async gatherAndPushResults() {
        const scores = [];
        const body = {};

        this.clearLabels();

        $('.dropdown').each(function() {
            scores.push($(this).val() || '0');
        });

        body.scores = scores;
        body.name = $('#name-input').val();
        body.profileImage = profileImage;
        body.email = $('#email-input').val();
        
        const postData = await $.ajax({
            url: '/api/friends',
            method: 'POST',
            data: body
        })
        .catch(err => {
            console.log("Error posting scores!", err);
            const {errors} = err.responseJSON.error;

            // turn the object of errors into an array
            const errorsArr = Object.keys(errors).map(i => errors[i]);

            if (errorsArr) {
                $("html, body").animate({ scrollTop: $('#survey-div').offset().top }, 500);

                errorsArr.forEach(error => {
                    const {path} = error;
                    const $label = $(`label[for="${path}-input"`).children('h2');

                    $label.attr('data-content', error.message);
                    $label.addClass('flash-color');

                    setTimeout(() => {
                        $label.removeClass('flash-color');
                    }, 3000);
                });
            }
        });

        if (postData) {
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

            if (!bestMatch) {
                alert('Sorry! There were no matches found for you. Maybe nobody has used the app yet?');
                return window.location.href = '/';
            }

            document.location.href = `/results?userId=${postedFriend.body._id}&matchId=${bestMatch._id}&score=${100 - lowestDifference}`
        }
    }
}

// Run on page load
survey.fetchAndDisplayQuestions();

// Event listeners
$(document).on('click', '#submit-button', function (e) {
    e.preventDefault();
    survey.gatherAndPushResults();
});

// Handles the profile image upload
$(document).on('change', '#profile-image', event => {
    event.preventDefault();

    let imageFormObj = new FormData();

    imageFormObj.append('imageName', `multer-image-${Date.now()}`);
    imageFormObj.append('imageData', event.target.files[0]);

    $.ajax({
        url: '/uploadmulter', 
        method: 'POST',
        data: imageFormObj,
        processData: false,
        contentType: false
    })
    .then(data => {
        console.log(data);

        if (data.success) {
            console.log("Succesfully uploaded the image!", data.document.imageData);

            $('#profile-image-img').attr('src', data.document.imageData);
            $('#profile-image-img').css('visibility', 'visible');

            $('#profile-image-subtitle').css('visibility', 'visible');
            
            profileImage = data.document.imageData;
        }
    })
    .catch(err => {
        console.log(err);
        alert('Error while uploading your image. Please try a different image. Accepts only JPG or PNG, or try using a smaller file size.');
    })
});
