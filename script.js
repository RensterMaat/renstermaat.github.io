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

function calculateProbability() {
    // Get values from your buttons or inputs
    // ...

    // Coefficients
    const coefficients = {
        'clarkScore': {
            'brisk': 0.7057,
            'non-brisk': 0.3649,
            'missing': 0,
            'absent': 0
        },
        'ldh': {
            'elevated': 0.1873,
            'moreThanTwice': -0.9471,
            'missing': 0.5858,
            'normal': 0
        },
        'whoStatus': {
            '1': -0.1744,
            '2-4': -1.2297,
            'missing': -0.4334,
            '0': 0
        },
        'brainMetastases': {
            'presentAsymptomatic': -0.0575,
            'missing': 0.2644,
            'presentSymptomatic': -1.1120,
            'absent': 0
        },
        'liverMetastases': {
            'missing': -0.0451,
            'present': -0.8500,
            'absent': 0
        }
    };

    let z = 1.155624; // Intercept

    // Update the z value based on the input features
    for (let attribute in selections) {
        z += coefficients[attribute][selections[attribute]];
    }

    // Calculate the probability using the logistic function
    let probability = 1 / (1 + Math.exp(-z));

    // Convert to percentage for displaying
    let percentage = Math.round(probability * 100);

    document.getElementById("result").textContent = percentage + "%";
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

// Detect if the device is touch capable
if ('ontouchstart' in window) {
    // If it is a touch device, remove the hover styles by applying a class to the body
    document.body.classList.add('touch-device');
} else {
    // If it's not a touch device, you can add any non-touch specific JavaScript (if any) here
}