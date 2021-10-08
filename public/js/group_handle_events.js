let groupSearchingInput = document.querySelector(".search-tool__input");

function openPostCreatorModal() {
    secondFlow.style.display = "flex";   
}

function handleModalRemoval() {
    secondFlow.style.display = "none";
}

function makeSubmitBtnAllowed() {
    formSubmitBtn.classList.remove("form__submit-button--not-allowed");
    formSubmitBtn.classList.add("form__submit-button--allowed");
    formSubmitBtn.setAttribute("type", "submit");
}

function makeSubmitBtnNotAllowed() {
    formSubmitBtn.classList.remove("form__submit-button--allowed");
    formSubmitBtn.classList.add("form__submit-button--not-allowed");
    formSubmitBtn.setAttribute("type", "button");
}
function handleTextAreaValue(){
    makeSubmitBtnAllowed();
}
// function handleTextAreaValue() {
//     if (textArea.value !== "") {
//         makeSubmitBtnAllowed();
//     }
//     else {
//         makeSubmitBtnNotAllowed();
//     }
// }