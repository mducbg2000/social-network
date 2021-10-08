var a = 1;
var tagP = document.getElementById("userId");
var userId = tagP.getAttribute('data-user-id');
function getData() {
    fetch
    (`/post/profile/${userId}/${a}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            response.text().then((data) => {
                let list = document.createElement('div');
                list.innerHTML = data;
                document.getElementsByClassName('center__post')[0].appendChild(list)
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(window.scrollY + window.innerHeight >= scrollHeight){
        a++;
        getData();
    }
})
getData();