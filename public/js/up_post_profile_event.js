document.getElementById('form').addEventListener("submit", async function (event) {
    var tagP = document.getElementById("userId");
    var userId = tagP.getAttribute('data-user-id');
    // console.log(userId);
    event.preventDefault();
    var content = event.target.contentPost.value
    var img  = srcImage;
    fetch
    ('/post', {
        method: 'POST',
        redirect: 'manual',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
            img: img,
            groupId: null
        }),
    })
        .then(response => {
            // console.log(response)
            window.location.href = `/profile/${userId}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    event.preventDefault();
})


