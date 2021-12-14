require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { checkUser, requireAuth }  = require('./middleware/Auth.middleware');

const authRoutes = require('./routes/Auth.routes');
const userRoutes = require('./routes/User.routes');
const postRoutes = require('./routes/Post.routes');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@media.04cpn.mongodb.net/media?retryWrites=true&w=majority`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
        )
        console.log('MongoDB connect');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const port = 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})