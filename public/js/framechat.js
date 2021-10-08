let userId = localStorage.getItem('userId')
const socket = io({
    transports: ['websocket'],
    autoConnect: true
});


socket.emit('home', userId)

socket.on('followingLogin', fId => {
    document.getElementById(`${fId}_state`).style.color = 'LimeGreen'
})

socket.on('followingLogout', fId => {
    document.getElementById(`${fId}_state`).style.color = 'SlateGray'
})

function sendMsg(from, to, content, img) {
    socket.emit("sendMsg", {from, to, content, img});
}

socket.on("receiveMsg", async data => {
    let msgArea = document.querySelector(`.framechat-body__msg-area[data-userid="${data.from}"]`);
    if (data.from === userId) {
        displaySentMessage(data.to, data.content, data.img);
    } else if (!framechatArea.hasChildNodes()) {
        await openFramechat(userId, data.from, data.fromName, data.avatar)
    } else if (msgArea == null) {
        document.getElementById(`${data.from}_notify`).style.display = 'contents'
    } else displayReceivedMessage(data.from, data.avatar, data.content, data.img);

});

const framechatArea = document.getElementById('framechat-area');
let page = 1; //used for fetching page of messages, indexed from 1, if page = -1 --> max of page, do not permit to scroll
const INVALID_PAGE = null;

/* ============================================================ */
function displaySentMessage(userID, content, img) {
    let msgArea = document.querySelector(`.framechat-body__msg-area[data-userid="${userID}"]`);
    if (content !== "") {
        let messageDOMStr = `<div class="outgoing-message message">${content}</div>`;
        msgArea.insertAdjacentHTML('beforeend', messageDOMStr);
    }

    if (img !== "") {
        let imgDOMStr = `<img class="outgoing-image" src="${img}" onclick="showImageDetail(this.src);">`;
        msgArea.insertAdjacentHTML('beforeend', imgDOMStr);
    }

    scrollToBottom();
}

function displayReceivedMessage(userID, userAvt, content, img) {
    let scroll = shouldScroll();
    let msgArea = document.querySelector(`.framechat-body__msg-area[data-userid="${userID}"]`);

    if (content !== "") {
        let messageDOMStr = `<div class="incoming-msg-wrapper">
                                <img src="${userAvt}" alt="sender avatar" class="incoming-msg-wrapper__sender-avt">
                                <div class="incoming-message message">${content}</div>
                            </div>`;
        msgArea.insertAdjacentHTML('beforeend', messageDOMStr);

    }

    if (img !== "") {
        let imgDOMStr = `<div class="incoming-msg-wrapper">
                            <img src="${userAvt}" alt="sender avatar" class="incoming-msg-wrapper__sender-avt">
                            <img class="incoming-image" src="${img}" onclick="showImageDetail(this.src);">
                        </div>`;
        msgArea.insertAdjacentHTML('beforeend', imgDOMStr);
    }

    if (scroll) scrollToBottom();
}

function displaySentHistory(userID, content, img) {
    let msgArea = document.querySelector(`.framechat-body__msg-area[data-userid="${userID}"]`);
    if (content !== "") {
        let messageDOMStr = `<div class="outgoing-message message">${content}</div>`;
        msgArea.insertAdjacentHTML('afterbegin', messageDOMStr);
    }

    if (img !== "") {
        let imgDOMStr = `<img class="outgoing-image" src="${img}" onclick="showImageDetail(this.src);">`;
        msgArea.insertAdjacentHTML('afterbegin', imgDOMStr);
    }
}

function displayReceivedHistory(userID, userAvt, content, img) {
    let msgArea = document.querySelector(`.framechat-body__msg-area[data-userid="${userID}"]`);
    if (content !== "") {
        let messageDOMStr = `<div class="incoming-msg-wrapper">
                            <img src="${userAvt}" alt="sender avatar" class="incoming-msg-wrapper__sender-avt">
                            <div class="incoming-message message">${content}</div>
                        </div>`;
        msgArea.insertAdjacentHTML('afterbegin', messageDOMStr);
    }

    if (img !== "") {
        let imgDOMStr = `<div class="incoming-msg-wrapper">
                            <img src="${userAvt}" alt="sender avatar" class="incoming-msg-wrapper__sender-avt">
                            <img class="incoming-image" src="${img}" onclick="showImageDetail(this.src);">
                        </div>`;
        msgArea.insertAdjacentHTML('afterbegin', imgDOMStr);
    }
}

function showImageDetail(img) {
    let pos = document.getElementById('framechat-area');
    let DOMStr = `<div id="img-message-detail">
                    <img src="${img}">
                    <svg onclick="closeImageDetail(event);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><path xmlns="http://www.w3.org/2000/svg" d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#868686" data-original="#f44336" class=""/><path xmlns="http://www.w3.org/2000/svg" d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa" data-original="#fafafa"/></g></svg>
                </div>`;
    pos.insertAdjacentHTML('afterend', DOMStr);
}

function closeImageDetail(event) {
    event.currentTarget.parentElement.remove();
}

/* ============================================================ */

/* ============================================================ */
async function openFramechat(contextID, userID, userName, userAvt) {
    let noti = document.getElementById(`${userID}_notify`)
    if (noti != null) document.getElementById(`${userID}_notify`).style.display = 'none'
    if (framechatArea.hasChildNodes()) framechatArea.removeChild(framechatArea.firstElementChild);
    framechatArea.insertAdjacentHTML('afterbegin', generateFramechatDOMStr(userID, userName, userAvt));
    page = 1
    await fetchHistory(contextID, userID, userAvt, page);
    await fetchHistory(contextID, userID, userAvt, ++page);
    scrollToBottom();
    registerEventsInFramechat(contextID, userID, userAvt);
}

function closeFramechat(event) {
    page = 1;
    framechatArea.removeChild(framechatArea.firstElementChild);
}

function registerEventsInFramechat(contextID, userID, userAvt) {
    let msgInput = document.querySelector('.framechat-footer__msg-input');
    let sendMsgButton = document.getElementById("framechat-footer__sendMsg-button");

    let imgLoader = document.querySelector('.img-loader');
    imgLoader.oninput = function() {
        for (let img of imgLoader.files) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                showImgPreview(userID, reader.result);
            }, false);
            reader.readAsDataURL(img);
        }
    }

    msgInput.onkeypress = function (event) {
        if (event.keyCode == 13 && !event.shiftKey) {
            event.preventDefault();
            let imgInputs = document.querySelectorAll(".framechat-footer__image-input");

            // phải 1 trong hai có dữ liệu mới cho gửi
            if (msgInput.innerHTML !== "" || imgInputs.length !== 0) {

                // text rỗng
                if (msgInput.innerHTML === "") {

                    for (let imgInput of imgInputs) {
                        sendMsg(contextID, userID, "", imgInput.src);
                        imgInput.parentElement.remove();
                    }
                }
                // ảnh rỗng
                else if (imgInputs.length === 0) {

                    sendMsg(contextID, userID, msgInput.innerHTML, "");
                    msgInput.innerHTML = "";
                }
                // vừa có ảnh, vừa có text
                else {

                    for (let i = 0; i < imgInputs.length; ++i) {
                        if (i === 0) {
                            sendMsg(contextID, userID, msgInput.innerHTML, imgInputs[0].src);
                            msgInput.innerHTML = "";
                            imgInputs[0].parentElement.remove();
                        }
                        else {
                            sendMsg(contextID, userID, "", imgInputs[i].src);
                            imgInputs[i].parentElement.remove();
                        }
                    }
                }
            }
        }
    };

    sendMsgButton.onclick = function () {
        // if (event.keyCode == 13 && !event.shiftKey) {
        //     event.preventDefault();
            let imgInputs = document.querySelectorAll(".framechat-footer__image-input");

            // phải 1 trong hai có dữ liệu mới cho gửi
            if (msgInput.innerHTML !== "" || imgInputs.length !== 0) {
                console.log("if 1")
                // text rỗng
                if (msgInput.innerHTML === "") {
                    console.log("if 2")
                    for (let imgInput of imgInputs) {
                        sendMsg(contextID, userID, "", imgInput.src);
                        imgInput.parentElement.remove();
                    }
                }
                // ảnh rỗng
                else if (imgInputs.length === 0) {
                    console.log("if 3")
                    sendMsg(contextID, userID, msgInput.innerHTML, "");
                    msgInput.innerHTML = "";
                }
                // vừa có ảnh, vừa có text
                else {
                    console.log("if 4")
                    for (let i = 0; i < imgInputs.length; ++i) {
                        if (i === 0) {
                            sendMsg(contextID, userID, msgInput.innerHTML, imgInputs[0].src);
                            msgInput.innerHTML = "";
                            imgInputs[0].parentElement.remove();
                        }
                        else {
                            sendMsg(contextID, userID, "", imgInputs[i].src);
                            imgInputs[i].parentElement.remove();
                        }
                    }
                }
            }
        // }
    };

    // scroll up to fetch more old messages
    let framechatBody = document.querySelector('.framechat-body');
    framechatBody.onscroll = async function () {
        if (framechatBody.scrollTop < 20) {
            if (page != INVALID_PAGE) {
                page++;
                await fetchHistory(contextID, userID, userAvt, page);
            }
        }
    };
}

async function fetchHistory(contextID, userID, userAvt, page) {
    let response = await fetch(`/chat/${contextID}/${userID}/${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    let responseData = [];
    if (response.status === 200) responseData = await response.json();

    if (responseData.data == null) {
        page = INVALID_PAGE;
        return;
    } else {
        for (let message of responseData.data.reverse()) {
            if (message.from === contextID) displaySentHistory(userID, message.content, message.img);
            else displayReceivedHistory(userID, userAvt, message.content, message.img);
        }
    }
}

function scrollToBottom() {
    let framechatBody = document.querySelector('.framechat-body');
    framechatBody.scrollTop = framechatBody.scrollHeight;
}

function shouldScroll() {
    let framechatBody = document.querySelector('.framechat-body');
    return framechatBody.scrollHeight - framechatBody.scrollTop - framechatBody.clientHeight < 25;
}

/* ============================================================ */


/* ============================================================ */
function generateFramechatDOMStr(userID, userName, userAvt) {
    return `<div class="framechat-wrapper">
                <div class="framechat-header">
                    <div class="framechat-header__user-info-wrapper">
                        <img src="${userAvt}" alt="avatar" class="framechat-header__user-avatar">
                        <a href="/profile/${userID}"><div class="framechat-header__user-name">${userName}</div></a>
                    </div>
                    <div class="framechat-header__btn-group">
                        <svg class="btn-group__minimize-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M492,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h472c11.046,0,20-8.954,20-20S503.046,236,492,236z" fill="#ff0000" data-original="#000000"/></g></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>
                        <svg class="btn-group__close-icon" onclick="closeFramechat(event);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512 512" xml:space="preserve"><g><g xmlns="http://www.w3.org/2000/svg"><g><path d="M294.111,256.001L504.109,46.003c10.523-10.524,10.523-27.586,0-38.109c-10.524-10.524-27.587-10.524-38.11,0L256,217.892    L46.002,7.894c-10.524-10.524-27.586-10.524-38.109,0s-10.524,27.586,0,38.109l209.998,209.998L7.893,465.999    c-10.524,10.524-10.524,27.586,0,38.109c10.524,10.524,27.586,10.523,38.109,0L256,294.11l209.997,209.998    c10.524,10.524,27.587,10.523,38.11,0c10.523-10.524,10.523-27.586,0-38.109L294.111,256.001z" fill="#ff0000" data-original="#000000"/></g></g><g xmlns="http://www.w3.org/2000/svg"></g></g></svg>
                    </div>
                </div>
                <div class="framechat-body">
                    <div class="framechat-body__intro-wrapper">
                        <img src="${userAvt}" alt="sender avatar" class="intro-wrapper__avatar">
                        <div class="intro-wrapper__user-name">${userName}</div>
                    </div>
                    <div class="framechat-body__empty-area"></div>
                    <div class="framechat-body__msg-area" data-userid="${userID}"></div>
                </div>
                <div class="framechat-footer">
                    <label class="framechat-footer__icon-wrapper">
                        <input class="img-loader" type="file" accept="image/*" multiple>
                        <svg viewBox="0 -1 17 17"><g fill="none" fill-rule="evenodd"><path d="M2.882 13.13C3.476 4.743 3.773.48 3.773.348L2.195.516c-.7.1-1.478.647-1.478 1.647l1.092 11.419c0 .5.2.9.4 1.3.4.2.7.4.9.4h.4c-.6-.6-.727-.951-.627-2.151z" style="fill: #ff3333;"></path><circle cx="8.5" cy="4.5" r="1.5" style="fill: #ff3333;"></circle><path d="M14 6.2c-.2-.2-.6-.3-.8-.1l-2.8 2.4c-.2.1-.2.4 0 .6l.6.7c.2.2.2.6-.1.8-.1.1-.2.1-.4.1s-.3-.1-.4-.2L8.3 8.3c-.2-.2-.6-.3-.8-.1l-2.6 2-.4 3.1c0 .5.2 1.6.7 1.7l8.8.6c.2 0 .5 0 .7-.2.2-.2.5-.7.6-.9l.6-5.9L14 6.2z" style="fill: #ff3333;"></path><path d="M13.9 15.5l-8.2-.7c-.7-.1-1.3-.8-1.3-1.6l1-11.4C5.5 1 6.2.5 7 .5l8.2.7c.8.1 1.3.8 1.3 1.6l-1 11.4c-.1.8-.8 1.4-1.6 1.3z" stroke-linecap="round" stroke-linejoin="round" style="stroke: #ff3333;"></path></g></svg>
                    </label>
                    <div class="framechat-footer__input-wrapper">
                        <div class="framechat-footer__image-input-wrapper" data-userid="${userID}"></div>
                        <div contenteditable="true" class="framechat-footer__msg-input" data-placeholder="Send something..."></div>
                    </div>
                    <label class="framechat-footer__icon-wrapper">
                        <button id="framechat-footer__sendMsg-button"></button>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path xmlns="http://www.w3.org/2000/svg" d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z" fill="#ff3333" data-original="#000000"/><path xmlns="http://www.w3.org/2000/svg" d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z" fill="#ff3333" data-original="#000000"/></g></svg>
                    </label>
                </div>
            </div>`;
}

function showImgPreview(userID, imgSrc) {
    let imgInpWrapper = document.querySelector(`.framechat-footer__image-input-wrapper[data-userid="${userID}"]`);
    let numberOfImages = imgInpWrapper.childElementCount;
    let imgDOMStr = `<div class="img-and-close-wrapper">
                        <img class="framechat-footer__image-input" src="${imgSrc}">
                        <svg class="close-image-input" data-closeImg-id="${numberOfImages}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve"><g><g><path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z"/></g></g></svg>
                    </div>`;
    imgInpWrapper.insertAdjacentHTML('beforeend', imgDOMStr);
    document.querySelector(`.close-image-input[data-closeImg-id="${numberOfImages}"]`).onclick = function(event) {
        event.currentTarget.parentElement.remove();
    }
}

/* ======================================================================================================================== */

