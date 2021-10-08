function dropdownSetting(post){
    var postId = post.getAttribute("data-id-dropdown");
    if(document.querySelector("[data-show-dropdown=" + CSS.escape(postId) + "]").style.display === "none") {
        document.querySelector("[data-show-dropdown=" + CSS.escape(postId) + "]").style.display = "block";
    }else{
        document.querySelector("[data-show-dropdown=" + CSS.escape(postId) + "]").style.display = "none";
    }

    document.querySelector("[data-delete-id=" + CSS.escape(postId) + "]").addEventListener('click', () => {
        fetch(`/post/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; text/html',
            }
        })
        .then(response => {
            console.log(response.body);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        document.querySelector("[data-display-none-id=" + CSS.escape(postId) + "]").style.display = "none";
    })
}