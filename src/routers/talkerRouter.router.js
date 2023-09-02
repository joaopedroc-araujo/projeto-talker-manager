const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validateToken = require('../middlewares/validateToken');
const validateTalker = require('../middlewares/validateTalker');

const router = express.Router();
router.use(validateToken);
router.use(validateTalker);

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const talker = req.body;
    try {
        const talkerFilePath = path.join(__dirname, '../talker.json');
        const data = await fs.readFile(talkerFilePath, 'utf8');
        const talkers = JSON.parse(data);
        const talkerIndex = talkers.findIndex((person) => person.id === Number(id));
        if (talkerIndex === -1) {
            return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
        talker.id = Number(id);
        talkers[talkerIndex] = talker;
        const updatedData = JSON.stringify(talkers);
        await fs.writeFile(talkerFilePath, updatedData);
        res.status(200).json(talker);
    } catch (err) {
        res.status(400).json({ message: req.message });
    }
});

module.exports = router;