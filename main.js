document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent the form from submitting normally

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (validateForm(username, password)) {
            // Here you can handle the login logic, e.g., sending data to the server
            console.log('Username:', username);
            console.log('Password:', password);
            console.log('Remember Me:', rememberMe);

            // Example: showing a successful login message
            alert('Login successful!');
        } else {
            alert('Please fill in all fields.');
        }
    });

    function validateForm(username, password) {
        // Check if username and password fields are not empty
        return username.trim() !== '' && password.trim() !== '';
    }
});

const strength = {
    1: "Weak",
    2: "Medium",
    3: "Strong",
};

const getIndicator = (password, strengthValue) => {
    strengthValue.upper = /[A-Z]/.test(password); 
    strengthValue.lower = /[a-z]/.test(password);
    strengthValue.numbers = /\d/.test(password);
    let strengthIndicator = 0;
    for (let metric in strengthValue) {
        if (strengthValue[metric] === true) {
            strengthIndicator++;
        }
    }
    return strength[strengthIndicator] ?? "";
};

const getStrength = (password) => {
    let strengthValue = {
        upper: false,
        numbers: false,
        lower: false,
    };
    return getIndicator(password, strengthValue);
};

const handlePasswordChange = () => {
    const passwordInput = document.getElementById('password');
    const suggestionDiv = document.getElementById('password-suggestion');
    let { value: password } = passwordInput;
    const strengthText = getStrength(password);

    if (strengthText) {
        suggestionDiv.innerText = `${strengthText} Password`;
    } else {
        suggestionDiv.innerText = "";
    }
};
