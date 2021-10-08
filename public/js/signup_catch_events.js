/* =============== Module catch eye-icon event =============== */

let eyeIcon = document.querySelectorAll(".input-with-eye > i");
let inputArea = document.querySelectorAll(".input-with-eye > input");
for (let i = 0; i < eyeIcon.length; ++i) eyeIcon[i].addEventListener("click", () => eyeEventHandler(eyeIcon[i], inputArea[i]));

/* ========================================================================================== */

/* =============== Module catch inputs' events =============== */

let fullName = document.querySelector('[name="fullname"]');
let mssv = document.querySelector('[name="mssv"');
let emailAddr = document.querySelector('[name="email"]');
let password = document.querySelector('[name="password"]');
let cfPassword = document.querySelector('[name="cf-password"]');
let alertAreas = document.querySelectorAll('[class="alert-area"]');
let major = document.getElementById('major-list');
let date = document.getElementById('date');
let month = document.getElementById('month');
let year = document.getElementById('year');

fullName.onblur = () => alertAreaHandler(!isNameValid(fullName.value), alertAreas[0]);
mssv.onblur = () => alertAreaHandler(!isMSSVValid(mssv.value), alertAreas[1]);
emailAddr.onblur = () => alertAreaHandler(!isEmailValid(emailAddr.value), alertAreas[2]);
password.onblur = () => alertAreaHandler(!isPasswordValid(password.value), alertAreas[3]);
cfPassword.onblur = () => alertAreaHandler(!isPasswordConfirmed(password.value, cfPassword.value), alertAreas[4]);

/* ========================================================================================== */

/* =============== Module catch submit event =============== */

document.querySelector('button[type="submit"]').onclick = () => submitHandler();

/* ========================================================================================== */