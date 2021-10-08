var b = 1;
var tagG = document.getElementById("groupId");
var groupId = tagG.getAttribute('data-group-id');

function getData() {
    fetch
    (`/post/group/${groupId}/${b}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            response.text().then((data) => {
                let list = document.createElement('div');
                list.innerHTML = data;
                document.getElementsByClassName('post')[0].appendChild(list)
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(window.scrollY + window.innerHeight >= scrollHeight){
        b++;
        getData();
    }
})
getData();
