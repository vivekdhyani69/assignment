const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
   
    createdBy: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true }, // Reference to the User who created the lead
});

const Lead = mongoose.model('Lead', LeadSchema);
module.exports = Lead;


