let eyeIcon = document.querySelectorAll(".input-with-eye > i");
let inputArea = document.querySelectorAll(".input-with-eye > input");
let password = document.querySelector('.password');
let cfPassword = document.querySelector('.cf-password');
let alertAreas = document.querySelectorAll('[class="alert-area"]');

function eyeEventHandler(eyeIcon, inputArea) {
    if (inputArea.getAttribute("type") === "password") {
        eyeIcon.setAttribute("class", "fas fa-eye");
        inputArea.setAttribute("type", "text");
    } else {
        eyeIcon.setAttribute("class", "fas fa-eye-slash");
        inputArea.setAttribute("type", "password");
    }
}

function alertAreaHandler(isInputInvalid, alertArea) {
    if (isInputInvalid === true) alertArea.style.display = "flex";
    else alertArea.style.display = "none";
}

function isPasswordConfirmed(password, cfpassword) { return cfpassword === password; }

function isValidToSubmit() {
    return isPasswordConfirmed(password.value, cfPassword.value);
}