function joinGroup(event, groupId) {
    let iconWrapper = event.currentTarget;
    let DOMStr = `<div class="item__icon item__icon--joined item__icon-tooltip-ancestor" onclick="leaveGroup(event, '${groupId}')">
                    <img src="/images/icons/joined.png">
                    <div class="item__icon-tooltip">Joined</div>
                </div>`;
    iconWrapper.insertAdjacentHTML("afterend", DOMStr);
    iconWrapper.remove();

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/group/" + groupId, true);
    xhttp.send();
}

function leaveGroup(event, groupId) {
    let iconWrapper = event.currentTarget;
    let DOMStr = `<div class="item__icon item__icon--not-joined item__icon-tooltip-ancestor" onclick="joinGroup(event, '${groupId}')">
                    <img src="/images/icons/not_joined.png">
                    <div class="item__icon-tooltip">Join group</div>
                </div>`;
    iconWrapper.insertAdjacentHTML("afterend", DOMStr);
    iconWrapper.remove();

    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/group/" + groupId, true);
    xhttp.send();
}