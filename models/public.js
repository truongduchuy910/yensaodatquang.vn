var { user, post, product, quill, attribute, hashtag, information, linking, content } = require('../database/database')
var { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');

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
                    "Object.name": "Xây Dựng Nhà Nuôi Yến",
                    "Object.type": "Thẻ"
                }, (err, docs) => {
                    var posts = []
                    docs.forEach(linking => {
                        posts.push(
                            new Promise((mnrs, rj) => {
                                post.findById(linking.pointId, (err, docs) => {
                                    mnrs(docs)
                                })
                            })
                        )
                    });
                    Promise.all(posts)
                        .then(rst => {
                            rs(rst)
                        })
                }).sort({ modifyDate: 'desc' })
            }),
        ])
            .then(rst => {
                res.render('public/pages/construct', {
                    posts: rst[0]
                })
            })

    },
    post: async function (req, res) {

        var hashtags = await new Promise((rs, rj) => {
            hashtag.find({
            }, (err, docs) => {
                rs(docs)
            }).limit(20).sort({ modifyDate: 'desc' })
        })

        var posts
        if (req.query.category) {

            var linkings = await new Promise(rs => {
                linking.find({
                    "Object.name": req.query.category
                }, (err, docs) => {
                    rs(docs)
                })
            })

            var getPosts = []
            linkings.forEach(linking => {

                var thisPost = new Promise(rs => {
                    post.findById(linking.pointId, (err, docs) => {
                        rs(docs)
                    }).sort({ modifyDate: 'desc' })
                })

                getPosts.push(thisPost)
            })

            posts = await Promise.all(getPosts)

        } else {
            var posts = await new Promise(rs => {
                post.find({}, (err, docs) => {
                    rs(docs)
                }).sort({ modifyDate: 'desc' })
            })
        }
        res.render('public/pages/post', {
            posts: posts,
            hashtags: hashtags
        })
    },
    guide: async function (req, res) {

        var hashtags = await new Promise((rs, rj) => {
            hashtag.find({
            }, (err, docs) => {
                rs(docs)
            }).limit(20).sort({ modifyDate: 'desc' })
        })

        var posts

        var linkings = await new Promise(rs => {
            linking.find({
                "Object.name": "Hướng Dẫn"
            }, (err, docs) => {
                rs(docs)
            })
        })

        var getPosts = []
        linkings.forEach(linking => {

            var thisPost = new Promise(rs => {
                post.findById(linking.pointId, (err, docs) => {
                    rs(docs)
                }).sort({ modifyDate: 'desc' })
            })

            getPosts.push(thisPost)
        })

        posts = await Promise.all(getPosts)

        res.render('public/pages/post', {
            posts: posts,
            hashtags: hashtags
        })
    },
    detailProduct: async function (req, res) {
        var thisProduct = await new Promise(rs => {
            product.findOne({
                url: '/sp/' + req.params.url
            }, (err, docs) => {
                rs(docs)
            })
        })
        var thisInformation = await new Promise(rs => {
            information.findOne({
                productId: thisProduct._id,
                type: 'Mô Tả'
            }, (err, docs) => {
                rs(docs)
            })
        })
        var attributes = await new Promise(rs => {
            attribute.find({}, (err, docs) => {
                rs(docs)
            })
        })
        res.render('public/pages/detail', {
            product: thisProduct,
            information: new QuillDeltaToHtmlConverter(thisInformation.delta, {}).convert(),
            attributes: attributes,
            orthes: await new Promise(rs => {
                product.find({}, (err, docs) => {
                    rs(docs)
                }).limit(4).sort({ modifyDate: "desc" })
            })
        })
    },
    detailPost: async function (req, res) {
        var thisPost = await new Promise(rs => {
            post.findOne({
                url: '/pt/' + req.params.url
            }, (err, docs) => {
                rs(docs)
            })
        })
        var thisContent = await new Promise(rs => {
            content.findOne({
                postId: thisPost._id,
                type: 'Nội Dung'
            }, (err, docs) => {
                rs(docs)
            })
        })
        res.render('public/pages/news', {
            post: thisPost,
            content: new QuillDeltaToHtmlConverter(thisContent.delta, {}).convert(),
            hashtags: await new Promise(rs => {
                hashtag.find({}, (err, docs) => {
                    rs(docs)
                })
            }),
            orthes: await new Promise(rs => {
                post.find({}, (err, docs) => {
                    rs(docs)
                }).limit(4).sort({ modifyDate: "desc" })
            })
        })

    }
}