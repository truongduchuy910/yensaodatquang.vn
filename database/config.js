var mongoose = require('mongoose')

module.exports = function () {
    console.log(process.env.uri)
    mongoose.connect("mongodb+srv://messenger:truongduc910@loaloa-rqfev.mongodb.net/yensaodatquang?retryWrites=true", { useNewUrlParser: true }, (err) => {
        if (!err) {
            console.log('Kết nối thành công tới mongodb');
        } else {
            console.log(err)
            throw err
        }
    })
    return mongoose
}
