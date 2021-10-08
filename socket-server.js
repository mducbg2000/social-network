const User = require('./models/user')
const socketService = require('./services/socket.service');
const chatService = require('./services/chat.service')
module.exports = io => {
    io.on("connection", async socket => {
        socket.on('disconnect', async (reason) => {
            console.log(`${socket.user} disconnected: ` + reason)
            try {
                if (socket.user != null)
                User.findById(socket.user).populate('followers').then(async u => {
                    for (let f of u.followers) {
                        if (f.online) {
                            io.to(`${f.socketId}`).emit('followingLogout', u._id)
                        }
                    }
                })
                await socketService.disconnect(socket.id)
            } catch (e) {
                console.error(e)
            }
        });

        socket.on('home', async (userId) => {
            try {
                socket.user = userId;
                console.log(socket.user + ' online')
                await socketService.connected(userId, socket.id)
                User.findById(userId).populate('followers').then(async u => {
                    for (let f of u.followers) {
                        if (f.online) {
                            io.to(`${f.socketId}`).emit('followingLogin', u._id)
                        }
                    }
                })
            } catch (e) {

            }

        })

        socket.on('sendMsg', async data => {
            let userTo = await User.findById(data.to);
            let userFrom = await User.findById(data.from);
            await chatService.sendMessage(data.from, data.to, data.content, data.img)
            data.avatar = userFrom.avatar
            data.fromName = userFrom.name
            io.to(`${userTo.socketId}`).emit('receiveMsg', data);
            io.to(`${userFrom.socketId}`).emit('receiveMsg', data);
        })

    })
}
