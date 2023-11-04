const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { Server } = require('socket.io');

require('dotenv').config();
const mongoose = require('mongoose');

require('./auth/auth');

//routes
const authRouter = require('./routes/authRouter');

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

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));