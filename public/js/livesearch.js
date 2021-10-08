/* ======================================================================================================================================= */
function showHintList(data, queryPath) {
    let output = "";
    output += `<div class="hint-list hint-list-layout hint-list-layout--absolute">`;

    if (data.length === 0) {
        output += `<div class="hint-item hint-item-layout">
                        <img class="hint-item__search-icon search-icon" src="/images/icons/search_fff.png" alt="search-icon">
                        <div class="hint-item__content">No suggestions</div>
                    </div>`;
    } else {
        for (let i of data) {
            output += `<a class="hint-item-hyperlink" href="${queryPath}?name=${i}">
                            <div class="hint-item hint-item-layout">
                                <img class="hint-item__search-icon search-icon" src="/images/icons/search_fff.png" alt="search-icon">
                                <div class="hint-item__content">${i}</div>
                            </div>
                        </a>`;
        }
    }
    output += `</div>`;
    return output;
}

// stop form from being submitted if there isn't any input's value
function handleFormSubmit(event) { return event.target["name"].value !== ""; }
/* ======================================================================================================================================= */


/* ======================================================================================================================================= */
let searchUserInputObj = document.querySelector('.search-input--user');
let searchGroupInputObj = document.querySelector('.search-input--group');
let groupHintListwrapper = document.querySelector('#group-live-searching-results');
let userHintListwrapper = document.querySelector('#user-live-searching-results');
/* ======================================================================================================================================= */


/* ======================================================================================================================================= */
searchUserInputObj.addEventListener('click', () => { userHintListwrapper.style.display = "block"; });
searchGroupInputObj.addEventListener('click', () => { groupHintListwrapper.style.display = "block"; });

document.addEventListener('click', function(event) {
    let isClickInside = searchUserInputObj.contains(event.target);
    if (!isClickInside)
        userHintListwrapper.style.display = "none";
});

document.addEventListener('click', function(event) {
    let isClickInside = searchGroupInputObj.contains(event.target);
    if (!isClickInside)
    groupHintListwrapper.style.display = "none";
});

searchUserInputObj.addEventListener('keyup', () => {
    userHintListwrapper.style.display = "block";
    if (searchUserInputObj.value === "") {
        userHintListwrapper.innerHTML = showHintList([], "/search_result/user");
    } else {
        let data = [];
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                JSON.parse(this.responseText).forEach((obj) => { data.push(obj.name); });
                userHintListwrapper.innerHTML = showHintList(data, "/search_result/user");
            }
        }
        xmlhttp.open("GET", "/search/user?name=" + searchUserInputObj.value, true);
        xmlhttp.send();
    }
});

searchGroupInputObj.addEventListener('keyup', () => {
    groupHintListwrapper.style.display = "block";
    if (searchGroupInputObj.value === "") {
        groupHintListwrapper.innerHTML = showHintList([], "/search_result/group");
    } else {
        let data = [];
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                JSON.parse(this.responseText).forEach((obj) => { data.push(obj.name); });
                groupHintListwrapper.innerHTML = showHintList(data, "/search_result/group");
            }
        }
        xmlhttp.open("GET", "/search/group?name=" + searchGroupInputObj.value, true);
        xmlhttp.send();
    }
});

/* ======================================================================================================================================= */