const express = require('express');  // express npm
const app = express();  
const port = 3000;
const path = require('path');  // path core
const ejs = require('ejs');  // ejs npm

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

// const photo = {
//   id: 1,
//   name: 'Photo Name',
//   description: 'Photo Description',
// };

// app.get('/', (req, res) => {
//   res.send(photo);
// });

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  // res.sendFile(path.resolve("./temp/index.html"));
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render("index")
});

app.get('/about', (req, res) => {
  res.render("about")
});

app.get('/add', (req, res) => {
  res.render("add")
});
