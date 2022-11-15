const express = require('express');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userDb = require('./dataBase/users');

app.get('/users', (req, res) => {
    console.log('Users endpoint');
    res.json(userDb);
});
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    res.json(userDb[userId]);
});
app.post('/users', (req, res) => {
    const userInfo = req.body;
    userDb.push(userInfo);

    if (!userInfo.name) {
        res.status(400).json({msg: `Pleas include name`});
    } else if (!userInfo.age) {
        res.status(400).json({msg: `Pleas include age`});
    }

    res.status(201).json('Created');
});
app.put('users/:userId', (req, res) => {
    const newUserInfo = req.body;
    const userId = req.params.userId;

    if (!isNaN(userId)) {
        res.status(400).json({msg: `The request cannot be fulfilled due to bad syntax.`});
    }

    if (!newUserInfo.name) {
        res.status(400).json({msg: `Pleas include name`});
    } else if (!newUserInfo.age) {
        res.status(400).json({msg: `Pleas include age`});
    }

    userDb[userId] = newUserInfo;

    res.json('Updated');
});

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;
    if (!isNaN(userId)) {
        res.status(400).json({msg: `The request cannot be fulfilled due to bad syntax.`});
    }
    if (!userDb[userId]) {
        res.status(400).json({msg: `No user with id of ${userId}`});
    } else {
        userDb.splice(+userId, 1);
    }
    res.json('Deleted');
});


app.listen(PORT, () => {
    console.log(`Server listen ${PORT}`);
});