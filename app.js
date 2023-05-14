const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});

const photo = {
  id: 1,
  name: 'Photo Name',
  description: 'Photo Description',
};

app.get('/', (req, res) => {
  res.send(photo);
});
