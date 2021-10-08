document.getElementById('form').addEventListener("submit", async function (event) {
    var tagG = document.getElementById("groupId");
    var groupId = tagG.getAttribute('data-group-id');
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
            groupId: groupId
        }),
    })
        .then(response => {
            // console.log(response)
            window.location.href = `/group/${groupId}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    event.preventDefault();
})


