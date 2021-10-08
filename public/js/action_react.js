function toggleLike(post){
    let postId = post.getAttribute("data-like-id");

    let state = document.querySelector("[data-like-id=" + CSS.escape(postId) + "]").className;
    let numLikeCurrent = post.getAttribute("data-number-like");
    let temp = numLikeCurrent;
    post.classList.toggle("fas");
    if(state == "far fa-heart"){
        fetch
            (`/like/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; text/html',
                }
            })
            .then(response => {
                response.json().then(res => {
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
        if(numLikeCurrent == null || numLikeCurrent == 0){
            document.querySelector("[data-pin=" + CSS.escape(postId) + "]").style.display = "flex";
        }
        numLikeCurrent++;
        document.querySelector("[data-new-like=" + CSS.escape(postId) + "]").textContent = numLikeCurrent;
        post.setAttribute("data-number-like", numLikeCurrent);

    }
    // if(state == "far fa-heart fas")
    else {
        fetch
            (`/like/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; text/html',
                }
            })
            .then(response => {
                response.json().then(res => {
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
        numLikeCurrent--;
        document.querySelector("[data-new-like=" + CSS.escape(postId) + "]").textContent = numLikeCurrent;
        post.setAttribute("data-number-like", numLikeCurrent);
        if(numLikeCurrent == 0){
            document.querySelector("[data-pin=" + CSS.escape(postId) + "]").style.display = "none";
        }
    }
}

