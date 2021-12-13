require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/Auth.routes');

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

app.use("/api/auth", authRoutes);

const port = 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})