const MIN_LENGTH = 6;
const HTTP_BAD_REQUEST_STATUS = 400;
const validateFields = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(HTTP_BAD_REQUEST_STATUS).json({
            message: 'O campo "email" é obrigatório',
        });
    } if (!password) {
        return res.status(HTTP_BAD_REQUEST_STATUS).json({
            message: 'O campo "password" é obrigatório',
        });
    } if (password.length < MIN_LENGTH) {
        return res.status(HTTP_BAD_REQUEST_STATUS).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        });
    } if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(HTTP_BAD_REQUEST_STATUS).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        });
    } next();
};

module.exports = validateFields;