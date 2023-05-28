const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// Create Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

// Create Model
const Photo = mongoose.model('Photo', PhotoSchema); // "Photos" alır ve küçük harf ve tekil olarak collectionu "photo" ismi ile oluşturur.

// Create a Photo
// Photo.create({
//   title: 'Photo Title 3',
//   description: 'Photo Description 3 lorem ipsum',
// });

// Read a Photo
// Photo.find({title: "Photo Title 1"})
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// Artık eskisi gibi find() içerisinde callback function kullanılamıyor.

// Update a Photo
// const id = '646a1e1355a73e39cddd1f40';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Title 33 Updated',
//     description: 'Photo Description 33 Updated',
//   },
//   { new: true }
// )
//   .then((updatedData) => {
//     console.log(updatedData);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Delete a Photo
// const id = '646a1db37d5a6268773cf18b';
// Photo.findByIdAndDelete(id)
//   .then((deletedData) => {
//     console.log(deletedData);
//   })
//   .catch((err) => console.log(err));
