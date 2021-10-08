var oldSrc = document.getElementById("output_image_group").src;
var tagG = document.getElementById("groupId");
var groupId = tagG.getAttribute('data-group-id');
var newSrc = "";
function preview_image_group(event){
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById('output_image_group');
        output.src = reader.result;
        newSrc += output.src;
        // console.log(newSrc);
    }
    reader.readAsDataURL(event.target.files[0]);

    document.getElementById("confirm_change_background").style.display = "flex";

    document.getElementById("cancelBtn").addEventListener('click', () => {
        document.getElementById("confirm_change_background").style.display = "none";
        document.getElementById('output_image_group').src = oldSrc;
    })

    // console.log(newSrc);
    document.getElementById("saveBtn").addEventListener('click', ()=>{
        fetch
        ('/group/background', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                groupId: groupId,
                background: newSrc
            }),
            redirect: 'manual'
        })
            .then(response => {
                response.json().then(body => {
                    // console.log(body)
                    window.location.href = `/group/${groupId}`;
                })
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
}

