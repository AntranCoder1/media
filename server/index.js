require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

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


const port = 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})