const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  // res.sendFile(path.resolve("./temp/index.html"));
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', { photos });
};

exports.getPhoto = async (req, res) => {
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};

exports.createPhoto = async (req, res) => {
  // console.log(req.files.image) // Eklediğimiz görselin bilgilerini konsola yazdırır.
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads'; // Görselleri yüklemek isteyeceğimiz klasörü değişkene atadık.
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir); // Eğer istediğimiz klasör yoksa oluşturmasını istedik.
  }

  let uploadImage = req.files.image; // Eklediğmiz görseli değişkene atadık.
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name; // Eklenen görselin dosya yolunu belirledik. (genel dosya yolu + /public/uploads/ + görsel ismi)

  uploadImage.mv(uploadPath, async () => {
    // mv() metodu ile yüklediğimiz görseli, lokalde oluşturduğumuz dosya yolunun içerisine taşıyoruz.
    await Photo.create({
      ...req.body, // Veritabanından body içindeki title, description ve date özelliklerini direk alıyoruz.
      image: '/uploads/' + uploadImage.name, // Veritabanındaki image kısmına uploads klasöründeki eklediğimiz görselin dosya yolunu veriyoruz.
    });
    res.redirect('/'); // Sonrasında anasayfaya geri dönüyoruz.
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title; // Fotoğraf başlığını, yeni girdiğimiz başlık ile güncelledik.
  photo.description = req.body.description; // Fotoğraf açıklamasını, yeni girdiğimiz açıklama ile güncelledik.
  photo.save();
  res.redirect(`/photos/${req.params.id}`); // Tekrar güncellediğimiz fotonun sayfasına id'si ile girdik.
};

exports.deletePhoto = async (req, res) => {
  // const photo = await Photo.findByIdAndRemove({ _id: req.params.id });
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedeImage = __dirname + '/../public' + photo.image; // Görseli yakaldık.
  fs.unlinkSync(deletedeImage);
  await Photo.findByIdAndRemove({ _id: req.params.id });
  res.redirect('/');
};
