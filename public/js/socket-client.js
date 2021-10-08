let userId = localStorage.getItem('userId')
const socket = io({
    transports: ['websocket'],
    autoConnect: true
});

// socket.onAny((event, ...args) => {
//     console.log(event, args);
// });

socket.emit('home', userId)

socket.on('followingLogin', name => {
    alert(`${name} connected`)
})







