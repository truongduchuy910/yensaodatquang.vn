var { user, post, product, quill, attribute, hashtag, information, linking, content } = require('../database/database')

module.exports = {
    home: function (req, res) {
        Promise.all([
            new Promise((rs, rj) => {
                post.find({}, (err, docs) => {
                    rs(docs)
                }).limit(4).sort({ modifyDate: 'desc' })
            }),
            new Promise((rs, rj) => {
                product.find({}, (err, docs) => {
                    rs(docs)
                }).limit(8).sort({ modifyDate: 'desc' })
            }),
        ])
            .then(rst => {
                res.render('public/pages/home', {
                    posts: rst[0],
                    products: rst[1]
                })
            })
    },
    listProduct: function (req, res) {
        Promise.all([
            new Promise((rs, rj) => {
                product.find({}, (err, docs) => {
                    rs(docs)
                }).sort({ modifyDate: 'desc' })
            }),
        ])
            .then(rst => {
                res.render('public/pages/product', {
                    products: rst[0]
                })
            })
    },
    construct: function (req, res) {
        Promise.all([
            new Promise((rs, rj) => {
                linking.find({
                    "Object.name": "Thi Công",
                    "object.type": "Loại Bài Viết"
                }, (err, docs) => {
                    rs(docs)
                }).sort({ modifyDate: 'desc' })
            }),
        ])
            .then(rst => {
                res.render('public/pages/construct', {
                    products: rst[0]
                })
            })

    },
    post: function (req, res) {
        res.render('public/pages/post')
    },
    detailProduct: function (req, res) {

    },
    detailPost: function (req, res) {

    }
}