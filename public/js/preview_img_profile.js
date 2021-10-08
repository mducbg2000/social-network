var oldSrc = document.getElementById("output_image_profile").src;
var tagP = document.getElementById("userId");
var userId = tagP.getAttribute('data-user-id');
var newSrc = "";
function preview_image_profile(event){
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById('output_image_profile');
        output.src = reader.result;
        newSrc += output.src;
    }
    reader.readAsDataURL(event.target.files[0]);

    document.getElementById("confirm_change_background").style.display = "flex";

    document.getElementById("cancelBtn").addEventListener('click', () => {
        document.getElementById("confirm_change_background").style.display = "none";
        document.getElementById('output_image_profile').src = oldSrc;
    })

    // console.log(newSrc);
    document.getElementById("saveBtn").addEventListener('click', ()=>{
        fetch
        ('/profile/background', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                background: newSrc
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

