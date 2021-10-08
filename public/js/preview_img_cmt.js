//Choose preview image comment
function preview_image_cmt(event, post){
    var postIdCmt = post.getAttribute("data-cmt-img-id");
    // console.log(postIdCmt);
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.querySelector("[data-preview-id=" + CSS.escape(postIdCmt) + "]");
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}   

//ThreeDots Click - Xóa 
function deleteStatus(){
    document.getElementById("myDropdown").classList.toggle("show");
}
    