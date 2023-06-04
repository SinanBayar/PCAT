const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id }); // Dosya yolundaki id ile veritabanındaki id'yi eşleştirecek değişkeni tanımladık.
  res.render('edit', { photo });
};
