function getIdCmt(post) {
    var postId = post.getAttribute("data-id");
    // console.log(postId);
    var content = document.querySelector("[data-id=" + CSS.escape(postId) + "]").value;
    // console.log(content);
    var img = document.querySelector("[data-preview-id=" + CSS.escape(postId) + "]").src;
    createCmt(postId, content, img);
    //Reset value input box
    document.querySelector("[data-id=" + CSS.escape(postId) + "]").value = "";
    document.querySelector("[data-preview-id=" + CSS.escape(postId) + "]").src = "";
}

function createCmt(postId, content, img){
    fetch
    ('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: postId,
            content: content,
            img: img
        }),
    })
        .then(response => {
            response.text().then(html => {
                let newCmt = document.createElement('div')
                newCmt.innerHTML = html
                document.querySelector("[data-new-cmt-id=" + CSS.escape(postId) + "]").appendChild(newCmt)
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
