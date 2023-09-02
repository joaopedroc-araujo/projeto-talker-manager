const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const validateToken = require('../middlewares/validateToken');
const validateTalker = require('../middlewares/validateTalker');

const HTTP_OK_STATUS = 200;

const router = express.Router();
// router.use(validateToken);
// router.use(validateTalker);

router.get('/', async (_req, res) => {
    const data = await fs.readFile('./src/talker.json', 'utf8');
    const talker = JSON.parse(data);
    res.status(HTTP_OK_STATUS).json(talker || []);
});

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
        res.status(401).json({ message: req.message });
    }
});

router.put('/:id', validateToken, validateTalker, async (req, res) => {
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

router.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const data = await fs.readFile('./src/talker.json', 'utf8');
    const talker = JSON.parse(data);
    const foundTalker = talker.find((talk) => talk.id === parseInt(id, 10));
    if (!foundTalker) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).json(foundTalker);
});

router.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const talkerFilePath = path.join(__dirname, '../talker.json');
        const data = await fs.readFile(talkerFilePath, 'utf8');
        const talkers = JSON.parse(data);
        const talkerIndex = talkers.findIndex((person) => person.id === Number(id));
        talkers.splice(talkerIndex, 1);
        const updatedData = JSON.stringify(talkers);
        // console.log(updatedData);
        await fs.writeFile(talkerFilePath, updatedData);
        res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (err) {
        res.status(400).json({ message: req.message });
    }
});

module.exports = router;