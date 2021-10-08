function followUser(event, userId) {
    let iconWrapper = event.currentTarget;
    let DOMStr = `<div class="item__icon item__icon--joined item__icon-tooltip-ancestor" onclick="unfollowUser(event, '${userId}')">
                    <img src="/images/icons/followed.png">
                    <div class="item__icon-tooltip">Followed</div>
                </div>`;
    iconWrapper.insertAdjacentHTML("afterend", DOMStr);
    iconWrapper.remove();

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/follow/" + userId, true);
    xhttp.send();
}

function unfollowUser(event, userId) {
    let iconWrapper = event.currentTarget;
    let DOMStr = `<div class="item__icon item__icon--not-joined item__icon-tooltip-ancestor" onclick="followUser(event, '${userId}')">
                    <img src="/images/icons/follow.png">
                    <div class="item__icon-tooltip">Follow</div>
                </div>`;
    iconWrapper.insertAdjacentHTML("afterend", DOMStr);
    iconWrapper.remove();

    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/follow/" + userId, true);
    xhttp.send();
}