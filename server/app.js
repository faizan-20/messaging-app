const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

require('dotenv').config();
const mongoose = require('mongoose');

require('./auth/auth');

//routes
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');

const PORT = 3000;

const app = express();
const http = require('http');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));