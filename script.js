// Store the selections for each attribute
let selections = {
    liverMetastases: null,
    brainMetastases: null,
    ldh: null,
    whoStatus: null,
    clarkScore: null
};

// Function to set the category for an attribute
function setCategory(attribute, category) {
    // Set the category in our selections object
    selections[attribute] = category;

    // Deselect all buttons for this attribute
    let buttons = document.querySelectorAll(`.category-btn[id^="${attribute}-"]`);
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });

    // Highlight the selected button
    let selectedButton = document.getElementById(`${attribute}-${category}`);
    selectedButton.classList.add('selected');

    // Check if all attributes have been selected, then calculate probability
    if (Object.values(selections).every(value => value !== null)) {
        calculateProbability();
    }
}

// Dummy function to calculate the probability
function calculateProbability() {
    // Here you can add your real logic to calculate the probability based on the selections
    let randomProbability = Math.floor(Math.random() * 100);
    document.getElementById('result').innerText = `${randomProbability}%`;
}

// Reset function
function resetCalculator() {
    selections = {
        liverMetastases: null,
        brainMetastases: null,
        ldh: null,
        whoStatus: null,
        clarkScore: null
    };

    let buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });

    document.getElementById('result').innerText = "0%";
}
