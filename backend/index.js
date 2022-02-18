require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const photoRoute = require('./routes/photo');
const categoryRoute = require('./routes/category');
const cors = require('cors');
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected')).catch(e => console.log(e));

const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "usernameSessions",
});

app.use(
    session({
        secret: "ssadasd",
        resave: false,
        saveUninitialized: false,
        polling:true,
        cookie: {
            maxAge: 7 * 24 * 60 * 60*1000
        },

        store: store,
    })
);

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/photo", photoRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));


