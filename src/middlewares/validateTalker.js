function validateName(name) {
    if (!name) {
        return 'O campo "name" é obrigatório';
    }
    if (name.length < 3) {
        return 'O "name" deve ter pelo menos 3 caracteres';
    }
    return null;
}

function validateAge(age) {
    if (!age) {
        return 'O campo "age" é obrigatório';
    }
    if (age < 18 || !Number.isInteger(age)) {
        return 'O campo "age" deve ser um número inteiro igual ou maior que 18';
    }
    return null;
}

function validateTalkWatchedAt(watchedAt) {
    if (!watchedAt) {
        return 'O campo "watchedAt" é obrigatório';
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
        return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    }
    return null;
}

// eslint-disable-next-line complexity
function validateTalkRate(rate) {
    if (rate === undefined || rate === null || rate === '') {
        return 'O campo "rate" é obrigatório';
    }
    if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
        return 'O campo "rate" deve ser um número inteiro entre 1 e 5';
    }
    return null;
}

function validateTalk(talk) {
    if (!talk) {
        return 'O campo "talk" é obrigatório';
    }

    const watchedAtError = validateTalkWatchedAt(talk.watchedAt);
    if (watchedAtError) {
        return watchedAtError;
    }

    const rateError = validateTalkRate(talk.rate);
    if (rateError) {
        return rateError;
    }

    return null;
}

function validateTalker(req, res, next) {
    const { name, age, talk } = req.body;

    const nameError = validateName(name);
    if (nameError) {
        return res.status(400).json({ message: nameError });
    }

    const ageError = validateAge(age);
    if (ageError) {
        return res.status(400).json({ message: ageError });
    }

    const talkError = validateTalk(talk);
    if (talkError) {
        return res.status(400).json({ message: talkError });
    }

    next();
}

module.exports = validateTalker;
