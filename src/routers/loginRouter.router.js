const express = require('express');
const generateToken = require('../middlewares/generateToken');
const validateFields = require('../middlewares/validateFields');

const router = express.Router();
router.use(generateToken);
router.use(validateFields);

router.post('/', async (req, res) => {
    try {
        res.status(200).json({ token: req.token });
    } catch (err) {
        res.status(400).json({ message: req.message });
    }
});

module.exports = router;