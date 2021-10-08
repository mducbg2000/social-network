//Preview img post
var srcImage = "";
function preview_image(event){
    var reader = new FileReader();
    reader.onload = function(){
        var output = document.getElementById('output_image');
        output.src = reader.result;
        srcImage = output.src;
    }
    reader.readAsDataURL(event.target.files[0]);
}