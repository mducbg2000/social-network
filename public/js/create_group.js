function areAllInputsValid(inputList) {
    for (let input of inputList) {
        if (input.value === "") return false;
    }
    return true;
}

let previewBox = document.querySelector('.preview-box');
let inputList = document.querySelectorAll('.sidebar__input');
let groupImgPreview = document.querySelector('.preview-box__group-img');
let groupNamePrewview = document.querySelector('.preview-box__group-name');
let submitBtn = document.querySelector('.submit-btn');

inputList[0].addEventListener('input', () => {

    /* ========== event 1 ========== */
    if (areAllInputsValid(inputList)) {
        submitBtn.classList.remove('not-allowed-btn');
        submitBtn.classList.add('allowed-btn');
    }
    else {
        submitBtn.classList.remove('allowed-btn');
        submitBtn.classList.add('not-allowed-btn');
    }
    /* ================================================== */

    /* ========== event 2 ========== */
    groupNamePrewview.innerHTML = inputList[0].value;
    /* ================================================== */
});


inputList[1].addEventListener('change', () => {

    /* ========== event 1 ========== */
    if (areAllInputsValid(inputList)) {
        submitBtn.classList.remove('not-allowed-btn');
        submitBtn.classList.add('allowed-btn');
    }
    else {
        submitBtn.classList.remove('allowed-btn');
        submitBtn.classList.add('not-allowed-btn');
    }
    /* ================================================== */

    /* ========== event 2 ========== */
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        groupImgPreview.src = reader.result;
    }, false);
    previewBox.classList.remove('preview-box--filtered');
    reader.readAsDataURL(inputList[1].files[0]);
    /* ================================================== */
});

function handleForm(event) {
    event.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(event.target[1].files[0]);
    let xhttp = new XMLHttpRequest();
    let body = {
        name: event.target[0].value,
        avatar: ""
    };
    xhttp.open("POST", "/group", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    reader.onload = function() {
        body.avatar = reader.result;
        xhttp.send(JSON.stringify(body));
    };
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) window.location.replace('/group/' + JSON.parse(this.response).groupId);
    };
}