document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("down_setting").onclick = function(){
        document.getElementById("show_down_setting").classList.toggle("down_setting_hide");
        this.classList.toggle("active");
    }
    let list_items = document.getElementsByClassName("friend__item_link");

    for (var i = 0; i<list_items.length; i++){
        list_items[i].onclick = function() {
            let id = this.id;
            // frontend
            document.getElementsByClassName("frame__chat__container")[0].style.display = "block";
            document.getElementsByClassName("frame__chat")[0].style.display = "block";
        };
    }

    let list_delete_icons = document.getElementsByClassName("frame-delete");
    for (var i = 0; i<list_delete_icons.length; i++){
        list_delete_icons[i].onclick = function() {
            this.closest(".frame__chat").style.display = "none";
            if(document.getElementsByClassName("frame__chat") == 0){
                document.getElementsByClassName("frame__chat__container")[0].style.display = "none";
            }

        };
    }
});
