const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validateToken = require('../middlewares/validateToken');
const validateTalker = require('../middlewares/validateTalker');

const router = express.Router();

router.post('/', validateToken, validateTalker, async (req, res) => {
    const talker = req.body;
    try {
        const talkerFilePath = path.join(__dirname, '../talker.json');
        const data = await fs.readFile(talkerFilePath, 'utf8');
        const talkers = JSON.parse(data);
        talker.id = talkers.length + 1;
        talkers.push(talker);
        const updatedData = JSON.stringify(talkers);
        await fs.writeFile(talkerFilePath, updatedData);
        // console.log([talker]);
        res.status(201).json(talker);
    } catch (err) {
        res.status(400).json({ message: req.message });
    }
});

module.exports = router;