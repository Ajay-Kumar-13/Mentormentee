const io = require("socket.io")(8900,{
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

const addUser =(socketId, userId) => {
    !users.some(user => user.userId === userId) && users.push({socketId, userId})
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

io.on("connection", (socket) => {
    console.log("a user connected!");
    socket.on("addUser", userId => {
        console.log("user connected with user id", userId);
        addUser(socket.id,userId)
        console.log(users);
    });

    socket.on("disconnect", ()=> {
        console.log("A User Disconnected!");
        removeUser(socket.id);
        console.log(users);
    })

    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId);
        if(user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            })
        }
        
    })
})


