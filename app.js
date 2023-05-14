const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// import express from 'express';
// const app = express();
// const port = 3000;
// import path from 'path';

// Eğer yukarıdaki yeni yöntem ile yapar require yerine import kullanırsak pacage.json dosyasına "type" : "module", olarak ekleme yapmamız gerekmektedir. 
// Ayrıca aşağıdaki __Ddirname yerine direk dosya yolunu secmemiz gerekmektedir.

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});

// const appLogger = (req, res, next) => {
//   console.log("MiddleWeare Function 1");
//   next();
// }

// const appLogger2 = (req, res, next) => {
//   console.log("MiddleWeare Function 2");
//   next();
// }

// app.use(appLogger);
// app.use(appLogger2);

app.use(express.static('public'));

// const photo = {
//   id: 1,
//   name: 'Photo Name',
//   description: 'Photo Description',
// };

// app.get('/', (req, res) => {
//   res.send(photo);
// });

app.get('/', (req, res) => {
  // res.sendFile(path.resolve("./temp/index.html"));
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});
