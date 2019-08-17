const info = [
    {label: "Name", for: "name-input", id: "name-input"},
    {label: "Link to Photo", for: "photo-url-input", id: "photo-url-input"},
];

const questions = [
    {
        number: 1,
        question: "Question 1 lorem ipsum dolar lorem ipsum dolar sali?",
        choices: [
            "Answer A",
            "Answer b",
            "Answer c",
            "Answer d"
        ]
    },
    {
        number: 2,
        question: "twenty lorem ipsum dolar lorem ipsum dolar sali?",
        choices: [
            "Answer A",
            "Answer b",
            "Answer c d",
            "Answer d"
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
        selections.append($(`<option value="" disabled selected hidden>Select an Option</option>`));

        // Loop through each answer and create a dropdown item for it
        item.choices.forEach( (item, i) => {
            selections.append($(`<option value="${i}">${item}</option>`));
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
