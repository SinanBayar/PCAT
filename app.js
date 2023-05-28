const express = require('express'); // express npm
const app = express();
const port = 3000;
const path = require('path'); // path core
const ejs = require('ejs'); // ejs npm
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

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
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Body ile saklanan verinin yakalanamıyor. Bu iki middleware fonksiyonu ile consolda body bilgisini bir nesne halinde yakalarız

// ROUTES
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve("./temp/index.html"));
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find({});
  res.render('index', { photos });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});
// Actionu "/photos", methodu "post" olan request.
