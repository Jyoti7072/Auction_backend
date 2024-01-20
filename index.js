const express = require("express")
const mongoose = require("mongoose")
const Data = require("./Src/Models/Data");
const { register, login, findUser } = require("./Src/Controllers/user");
const server = express();
const cors = require("cors");
const { addForm } = require("./Src/Controllers/Form");
const { validateForm, isValidated } = require("./Src/Middleware");
const { Server } = require("socket.io")
const http = require("http")
const app = http.createServer(server)
const io = new Server(app)

server.use(express.json());
server.use(cors());
server.get("/", (req, res) => {
    res.status(200), json({
        uname: "Jyoti",
        uphone: "0000000000",
    })
});
server.post("/register", register);
server.post("/login", login);
server.post("/addForm", validateForm, isValidated, addForm)

io.on("connection", socket => {
    console.log("new user connected")
    socket.on("message", (message, room) => {
        console.log(`New message received in ${room} and message is ${message}`);
        socket.to(room).emit("message", message)
    })

    socket.on("join", (room) => {
        socket.join(room)
        socket.emit("joined")
    })

});
app.listen(5000, function() {
    console.log('Connected to port:' + (5000));

});
mongoose.connect("mongodb://localhost:27017")
    .then(data => console.log("Database connected"))
    .catch(error => console.log("error"))