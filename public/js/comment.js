function showDivCmt(post){
    var z = 1;
    var postId = post.getAttribute("data-swrap-cmt-id");
    document.querySelector("[data-post-id=" + CSS.escape(postId) + "]").style.display = "block";
    var time = post.getAttribute("data-time");
    if(time == 0){
        fetch
        (`/comment/${postId}/${z}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; text/html',
            }
        })
            .then(response => {
                response.json().then(res => {
                    let oldCmt = document.createElement('div');
                    oldCmt.innerHTML = res.html;
                    document.querySelector("[data-old-cmt-id=" + CSS.escape(postId) + "]").appendChild(oldCmt);
                    if(res.numberOfCmtInPage == 10) {
                        document.querySelector("[data-more-id=" + CSS.escape(postId) + "]").style.display = "block";
                        document.querySelector("[data-more-id=" + CSS.escape(postId) + "]").addEventListener('click', () => {
                            z++;
                            fetchagain(z, postId);
                        });
                    }
                    else{
                        document.querySelector("[data-more-id=" + CSS.escape(postId) + "]").style.display = "none";
                    }
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
            post.setAttribute('data-time','1');
    }
}
fetchagain = function(page, postId){
    fetch
    (`/comment/${postId}/${page}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; text/html',
        }
    })
        .then(response => {
            response.json().then(res => {
                let oldCmt = document.createElement('div');
                oldCmt.innerHTML = res.html;
                document.querySelector("[data-old-cmt-id=" + CSS.escape(postId) + "]").appendChild(oldCmt);
                if(res.numberOfCmtInPage != 10){
                    document.querySelector("[data-more-id=" + CSS.escape(postId) + "]").style.display = "none";
                }
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
