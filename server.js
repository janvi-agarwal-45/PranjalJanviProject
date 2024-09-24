const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 3019;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => console.log("MongoDB connection error:", err));   
const db = mongoose.connection;
db.once('open', () => {
console.log("MongoDB connection successful");
});
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    gender: String
});
const Users = mongoose.model("Users", userSchema);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','form.html'));
});
app.post('/post', async (req, res) => {
    const { firstName, lastName, email, phone, gender } = req.body;

    const user = new Users({
        firstName,
        lastName,
        email,
        phone,
        gender
    });

    await user.save();
    console.log(user);
    res.send("Registration Successful");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});