const { default: mongoose, trusted } = require("mongoose");

const userStockSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stocksList: [{
        stockSymbol: {
            type: String,
            required: true
        },
        stockAmount: {
            type: Number,
            required: true
        },
        dateOfPurchase: {
            type: Date,
            required: true
        },
        priceDate: {
            type: Date,
            required: false
        }
    }]
})

module.exports = mongoose.model('UserStock', userStockSchema);