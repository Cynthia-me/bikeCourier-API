const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    parcelItem : {
        type:String,
        required:true,
        max:30
    },
    parcelWeight : {
        type:String,
        required:true,
        max:10
    },
    From: {
        type:String,
        required:true,
    },
    To: {
        type:String,
        required:true,
    },
    receiver: {
        type: String,
        required: true,
        max: 255
    },
    receiver_tel: {
        type: Number,
        required: true
    },
    Status: {
        type:String,
        default: ""
    }
})

parcelSchema.methods.isParcelOwner = function (id) {
    if (this.user._id == id) {
        return true;
    } else {
        return false;
    }
};

module.exports = mongoose.model('parcels',parcelSchema);