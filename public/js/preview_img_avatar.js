var oldSrcAvatar = document.getElementById("output_image_avatar").src;
var tagP = document.getElementById("userId");
var userId = tagP.getAttribute('data-user-id');
var newSrcAvatar = "";

function preview_image_profile_avatar(event){
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById('output_image_avatar');
        output.src = reader.result;
        newSrcAvatar += output.src;
    }
    reader.readAsDataURL(event.target.files[0]);

    document.getElementById("confirm_change_background").style.display = "flex";

    document.getElementById("cancelBtn").addEventListener('click', () => {
        document.getElementById("confirm_change_background").style.display = "none";
        document.getElementById('output_image_avatar').src = oldSrcAvatar;
    })

    document.getElementById("saveBtn").addEventListener('click', ()=>{
        fetch
        ('/profile/avatar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                avatar: newSrcAvatar
            }),
            redirect: 'manual'
        })
            .then(response => {
                response.json().then(body => {
                    // console.log(body)
                    window.location.href = `/profile/${userId}`;
                })
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
}

