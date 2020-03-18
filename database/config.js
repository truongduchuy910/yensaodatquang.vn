var mongoose = require('mongoose')

module.exports = function () {
    console.log(process.env.uri)
    mongoose.connect("mongodb://yensaodatquang:Yensaodatquang.vn@139.180.214.47:27017/yensaodatquang?retryWrites=true", { useNewUrlParser: true }, (err) => {
        if (!err) {
            console.log('Kết nối thành công tới mongodb');
        } else {
            throw err;
        }
    })
    return mongoose
}
