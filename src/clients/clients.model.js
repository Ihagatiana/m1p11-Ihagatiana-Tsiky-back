const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  photo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'images', required: false }],
  credential: [{ type: mongoose.Schema.Types.ObjectId, ref: 'credentials', required: false }],
});

const clients = mongoose.model('clients', clientsSchema);

module.exports = clients; 
