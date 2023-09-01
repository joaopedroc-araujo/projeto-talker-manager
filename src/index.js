const fs = require('fs').promises;
const express = require('express');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile('./src/talker.json', 'utf8');
  const talker = JSON.parse(data);
  res.status(HTTP_OK_STATUS).json(talker || []);
  });

app.listen(PORT, () => {
  console.log('Online');
});
