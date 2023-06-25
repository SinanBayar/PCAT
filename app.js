const express = require('express'); // express npm
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

/* const path = require('path'); // path core */
/* const ejs = require('ejs'); // ejs npm */
/* const fs = require('fs'); // path core */

/* const Photo = require('./models/Photo'); */
const app = express();
const port = process.env.PORT || 3000; // 3000 veya kullanılacak servis sağlayıcının belirlediği "PORT" da çalışabilir.

const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');

// Connect DB
// mongoose.connect('mongodb://localhost/pcat-test-db');
mongoose.connect('mongodb+srv://sinanbayar:cjuCUNm0TKAEBB2h@cluster0.getkuse.mongodb.net/pcat-db?retryWrites=true&w=majority')
.then(() => console.log("MongoDB Connected!"))
.catch((err) => console.log(err))
// localhost'daki mongoDB yerine buluttaki mongoDB'ye kullanıcı adı ve şifre ile bağladık.

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
app.get('/', photoControllers.getAllPhotos); // Anasayfada bütün fotoğrafları gösteriyoruz.
app.get('/photos/:id', photoControllers.getPhoto); // Id'sine göre istenen fotoğrafın olduğu sayfayı açıyoruz.
app.post('/photos', photoControllers.createPhoto); // Belirlediğimiz title, description özelliklerine sahip fotoğrafı siteye yüklüyoruz.
app.put('/photos/:id', photoControllers.updatePhoto); // Id'sine göre belirlenen fotoğrafın title ve description özelliklerini güncelliyoruz.
app.delete('/photos/:id', photoControllers.deletePhoto); // Id'sine göre belirlenen fotoğrafı siliyoruz.

app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/photos/edit/:id', pageControllers.getEditPage);




