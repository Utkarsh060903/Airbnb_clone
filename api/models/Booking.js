const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    place:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    } , 

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    checkIn: {
        type: Date,
        required: true
    } , 

    checkOut: {
        type: Date,
        required: true
    } , 

    numberOfGuests: {
        type: Number,
        required: true
    } , 

    name : {
        type: String,
        required: true
    } , 

    phone: {
        type: String,
        required: true
    },

    price: {
        type: Number,
    }
    
})

const bookingModel = mongoose.model('Booking' , bookingSchema)

module.exports = bookingModel;