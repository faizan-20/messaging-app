const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//routes

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));