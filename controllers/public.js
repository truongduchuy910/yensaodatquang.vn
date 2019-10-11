var public = require('../models/public')
module.exports = function (app) {
    app
        .get('/', public.home)

        .get('/san-pham', public.listProduct)
        .get('/thi-cong', public.construct)
        .get('/huong-dan', public.guide)

        .get('/tin-tuc', public.post)
        .get('/sp/:url', public.detailProduct)
        .get('/pt/:url', public.detailPost)
}