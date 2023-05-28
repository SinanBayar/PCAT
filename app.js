const express = require('express'); // express npm
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const path = require('path'); // path core
const ejs = require('ejs'); // ejs npm
const fs = require('fs'); // path core

const Photo = require('./models/Photo');
const app = express();
const port = 3000;

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
app.get('/', async (req, res) => {
  // res.sendFile(path.resolve("./temp/index.html"));
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find({}).sort('-dateCreated');
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
  // console.log(req.files.image) // Eklediğimiz görselin bilgilerini konsola yazdırır.
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads'; // Görselleri yüklemek isteyeceğimiz klasörü değişkene atadık.
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Eğer istediğimiz klasör yoksa oluşturmasını istedik.
  }

  let uploadImage = req.files.image; // Eklediğmiz görseli değişkene atadık.
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name; // Eklenen görselin dosya yolunu belirledik. (genel dosya yolu + /public/uploads/ + görsel ismi)

  uploadImage.mv(uploadPath, async () => {
    // mv() metodu ile yüklediğimiz görseli, lokalde oluşturduğumuz dosya yolunun içerisine taşıyoruz.
    await Photo.create({
      ...req.body, // Veritabanından body içindeki title, description ve date özelliklerini direk alıyoruz.
      image: '/uploads/' + uploadImage.name, // Veritabanındaki image kısmına uploads klasöründeki eklediğimiz görselin dosya yolunu veriyoruz.
    });
    res.redirect('/'); // Sonrasında anasayfaya geri dönüyoruz.
  });
});
// Actionu "/photos", methodu "post" olan request.

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); // Dosya yolundaki id ile veritabanındaki id'yi eşleştirecek değişkeni tanımladık.
  res.render('edit', { photo });
});

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title; // Fotoğraf başlığını, yeni girdiğimiz başlık ile güncelledik.
  photo.description = req.body.description; // Fotoğraf açıklamasını, yeni girdiğimiz açıklama ile güncelledik.
  photo.save();
  res.redirect(`/photos/${req.params.id}`); // Tekrar güncellediğimiz fotonun sayfasına id'si ile girdik.
});

app.delete('/photos/:id', async (req, res) => {
  // const photo = await Photo.findByIdAndRemove({ _id: req.params.id });
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedeImage = __dirname + '/public' + photo.image; // Görseli yakaldık.
  fs.unlinkSync(deletedeImage);
  await Photo.findByIdAndRemove({ _id: req.params.id });
  res.redirect('/');
});
