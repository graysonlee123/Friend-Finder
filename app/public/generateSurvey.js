const info = [
    {label: "Name", for: "name-input", id: "name-input"},
    {label: "Link to Photo", for: "photo-url-input", id: "photo-url-input"},
];

const questions = [
    {
        question: "You enjoy vibrant social events with lots of people.",
        choices: [
            "Very much so",
            "Most of the time",
            "Neutral",
            "Not often",
            "Not at all"
        ]
    },
    {
        question: "You often think about what you should have said in a conversation long after it has taken place.",
        choices: [
            "Very often",
            "Sometimes",
            "Neutral",
            "Not so much",
            "Never"
        ]
    },
    {
        question: "People can rarely upset you.",
        choices: [
            "Very true",
            "True",
            "Neutral",
            "Not true",
            "Not true at all"
        ]
    },
    {
        question: "It would be a challenge for you to spend the whole weekend all by yourself without feeling bored.",
        choices: [
            "Very much so",
            "Yes",
            "Neutral",
            "No",
            "Not at all"
        ]
    },
    {
        question: "You are more of a detail-oriented than a big picture person.",
        choices: [
            "Very true",
            "True",
            "Neutral",
            "Not true",
            "Not true at all"
        ]
    },
    {
        question: "When looking for a movie to watch, you can spend ages browsing the catalog.",
        choices: [
            "Very true",
            "True",
            "Neutral",
            "Not true",
            "Not true at all"
        ]
    },
    {
        question: "When you sleep, your dreams tend to be bizarre and fantastical.",
        choices: [
            "Very much so",
            "Sometimes",
            "Neutral",
            "Not too often",
            "Not at all"
        ]
    },
    {
        question: "You tend to focus on present realities rather than future possibilities.",
        choices: [
            "Very true",
            "True",
            "Neutral",
            "Not true",
            "Not true at all"
        ]
    },
    {
        question: "When starting to work on a project, you prefer to make as many decisions upfront as possible.",
        choices: [
            "Very true",
            "True",
            "Neutral",
            "Not true",
            "Not true at all"
        ]
    },
    {
        question: "After a long and exhausting week, a fun party is just what you need.",
        choices: [
            "Very true",
            "True",
            "Neutral",
            "Not true",
            "Not true at all"
        ]
    }
]

function generateQuestions () {
    const container = $("#questions-container");

    questions.forEach( (item, i) => {
        const questionContainer = $("<div class='question-box survey-row'>");

        const label = $(`<label for="question-${i}" class="label">`);
        label.append($(`<h2>Question ${i + 1}</h2>`), $(`<p>${item.question}</p>`));

        const selections = $(`<select name="question-${i}" id="question-${i}" class="dropdown">`);
        // selections.append($(`<option value="" disabled selected hidden>Select an Option</option>`));

        // Loop through each answer and create a dropdown item for it
        item.choices.forEach( (item, i) => {
            if (item === "Neutral") {
                selections.append($(`<option value="${i}" selected>${item}</option>`));
            } else {
                selections.append($(`<option value="${i}">${item}</option>`));
            }
        });

        questionContainer.append(label);
        questionContainer.append(selections);

        container.append(questionContainer);
    });
}

function generateInfo () {
    const container = $("#info-container");

    info.forEach( (item, i) => {
        const infoContainer = $(`<div class="text-input-box survey-row">`);

        const label = $(`<label for="${item.for}" class="label required-field">`);
        label.append($(`<h2>${item.label}</h2>`));
        
        const input = $(`<input type="text" id="${item.id}" class="text-input">`);

        infoContainer.append(label, input);
        container.append(infoContainer);
    });
}

generateInfo();
generateQuestions();
