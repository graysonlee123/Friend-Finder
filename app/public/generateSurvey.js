function generateInfo () {
    const container = $("#info-container");

    info.forEach( (item, i) => {
        const infoContainer = $(`<div class="text-input-box survey-row">`);

        const label = $(`<label for="${item.for}" class="label required-field">`);
        label.append($(`<h2 id="required-${item.id}">${item.label}</h2>`));
        
        const input = $(`<input type="text" id="${item.id}" class="text-input" placeholder="${item.placeholder}">`);
        // if (item.id === "photo-url-input") {
        //     input.attr("onfocusout", "checkInput()");
        // }

        infoContainer.append(label, input);
        container.append(infoContainer);
    });
};

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
};

generateInfo();
generateQuestions();
