var { editPost, dashboard, listPost, login, loginRequire, signup, editProduct, listProduct } = require('../models/client')
var db = require('../models/database')
var upload = require('../models/upload')
module.exports = function (app) {
    app
        .get('/ad/login', login.render)
        .get('/ad/login-require', loginRequire.render)
        .get('/signup', signup.render)

        .get('/ad/dashboard', isAd, dashboard.render)
        .post('/ad/dashboard/createPost', isAd, upload.handPost, dashboard.createPost)
        .post('/ad/dashboard/createProduct', isAd, upload.handPost, dashboard.createProduct)

        .get('/ad/listPost', isAd, listPost.render)
        .get('/ad/listPost/remove/:id', isAd, listPost.remove)

        .get('/ad/listProduct', isAd, listProduct.render)
        .get('/ad/listProduct/remove/:id', isAd, listProduct.remove)

        .get('/ad/editPost/:id', isAd, editPost.render)
        .post('/ad/editPost/createHashtag', isAd, editPost.createHashtag)
        .post('/ad/editPost/deleteHashtag', isAd, editPost.deleteHashtag)
        .post('/ad/editPost/searchHashtag', isAd, editPost.searchHashtag)
        .post('/ad/editPost/addHashtag', isAd, editPost.addHashtag)
        .post('/ad/editPost/removeHashtag', isAd, editPost.removeHashtag)
        .post('/ad/editPost/getContent', isAd, editPost.getContent)
        .post('/ad/editPost/updateContent', isAd, editPost.updateContent)
        .post('/ad/editPost/updateImage/:id', isAd, upload.handPost, editPost.updateImage)


        .get('/ad/editProduct/:id', isAd, editProduct.render)
        .post('/ad/editProduct/updateImage/:id', isAd, upload.handPost, editProduct.updateImage)

        .post('/ad/editProduct/createAttribute', isAd, editProduct.createAttribute)
        .post('/ad/editProduct/deleteAttribute', isAd, editProduct.deleteAttribute)
        .post('/ad/editProduct/searchAttribute', isAd, editProduct.searchAttribute)
        .post('/ad/editProduct/addAttribute', isAd, editProduct.addAttribute)
        .post('/ad/editProduct/removeAttribute', isAd, editProduct.removeAttribute)
        .post('/ad/editProduct/getInformation', isAd, editProduct.getInformation)
        .post('/ad/editProduct/updateInformation', isAd, editProduct.updateInformation)

}
function isAd(req, res, next) {
    next()
    // if (req.isAuthenticated()) {
    //     next()
    // } else {
    //     res.redirect('/ad/login-require')
    // }
}