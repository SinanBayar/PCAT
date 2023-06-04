const express = require('express'); // express npm
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

/* const path = require('path'); // path core */
/* const ejs = require('ejs'); // ejs npm */
/* const fs = require('fs'); // path core */

/* const Photo = require('./models/Photo'); */
const app = express();
const port = 3000;

const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');

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
app.use(express.json()); // Body ile saklanan verinin yakalanamıyor. Bu iki middleware fonksiyonu ile consolda body bilgisini bir nesne halinde yakalarız
app.use(fileUpload()); // express-fileupload kullanmak için gerekli middleware fonksiyonu.
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
); // Browserda Put request desteklenmediği için Post requesti manipüle ederek Put request gibi kullanmamızı sağlıyor.

// ROUTES
app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);




