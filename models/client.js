var { user, post, product, quill, attribute, hashtag, information, linking, content, order } = require('../database/database')
var { QuillDeltaToHtmlConverter } = require('quill-delta-to-html');
var config = require('../config.json')
var upload = require('./upload')

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.replace(/ /g, "-");
    str = str.trim();
    return str;
}
module.exports = {

    dashboard: {
        render: function (req, res) {
            res.render('client/pages/dashboard')
        },
        createPost: function (req, res) {
            post.insertMany({
                name: req.body.fields.name,
                images: req.body.files,
                url: '/pt/' + change_alias(req.body.fields.name)
            }, (err, docs) => {
                content.insertMany({
                    modifyDate: Date(),
                    postId: docs[0]._id,
                    type: config.post.content[0].type
                }, (err, docss) => {
                    console.log(docss)
                    res.redirect('/ad/editPost/' + docs[0]._id)

                })
            })
        },
        createProduct: function (req, res) {
            product.insertMany({
                name: req.body.fields.name,
                price: req.body.fields.price,
                images: req.body.files,
                url: '/sp/' + change_alias(req.body.fields.name)
            }, (err, docs) => {
                information.insertMany({
                    modifyDate: Date(),
                    productId: docs[0]._id,
                    type: config.product.information[0].type

                }, (err, docss) => {
                    res.redirect('/ad/editProduct/' + docs[0]._id)

                })
            })
        }
    },
    listPost: {
        render: function (req, res) {
            Promise.all([
                new Promise((rs, rj) => {
                    post.find({}, (err, docs) => {
                        rs(docs)
                    })
                })
            ])
                .then(rst => {
                    res.render('client/pages/listPost', {
                        posts: rst[0]
                    })
                })

        },
        remove: function (req, res) {
            post.findById(req.params.id, (err, docs) => {
                upload.delete(docs.images)
                docs.remove(err => {
                    res.redirect('/ad/listPost')
                })

            })
            content.remove({
                postId: req.params.id
            }, (err, docs) => {

            })
            linking.remove({
                pointId: req.params.id
            }, (err, docs) => {

            })
        },
    },
    listProduct: {
        render: function (req, res) {
            Promise.all([
                new Promise((rs, rj) => {
                    product.find({}, (err, docs) => {
                        rs(docs)
                    })
                })
            ])
                .then(rst => {
                    res.render('client/pages/listProduct', {
                        products: rst[0]
                    })
                })

        },
        remove: function (req, res) {
            product.findById(req.params.id, (err, docs) => {
                if (docs) {
                    upload.delete(docs.images)
                    docs.remove(err => {
                        res.redirect('/ad/listProduct')
                    })
                } else {
                    res.redirect('/ad/dashboard')
                }

            })
            information.remove({
                productId: req.params.id
            }, (err, docs) => {

            })
            linking.remove({
                pointId: req.params.id
            }, (err, docs) => {

            })
        },
    },
    listOrder: {
        render: function (rea, res) {
            order.find({}, (err, docs) => {
                console.log(docs);
                res.render('client/pages/listOrder', {
                    orders: docs
                })
            })

        }
    },
    editPost: {
        render: function (req, res) {
            Promise.all([
                new Promise((rs, rj) => {
                    post.findById(req.params.id, (err, docs) => {
                        rs(docs)
                    })
                }),
                new Promise((rs, rj) => {
                    linking.find({ pointId: req.params.id }, (err, docs) => {
                        rs(docs)
                    })
                })
            ])
                .then(rst => {
                    var tags = config.post.hashtag
                    tags.forEach(tag => {
                        tag.values = []
                        rst[1].forEach(linking => {
                            if (linking.Object && linking.Object.type == tag.type) {
                                tag.values.push(linking.Object)
                            }
                        })
                    })
                    var contents = config.post.contents
                    res.render('client/pages/editPost', {
                        post: rst[0],
                        hashtags: tags,
                        contents: contents
                    })
                })

        },
        createHashtag: function (req, res) {
            var name = req.body.name
            var type = req.body.type
            hashtag.insertMany({
                name: name,
                type: type
            }, (err, docs) => {
                res.send(docs)
            })
        },
        deleteHashtag: function (req, res) {
            var id = req.body.id
            hashtag.findByIdAndRemove(id, (err, docs) => {
                res.send(docs)
            })
        },
        searchHashtag: function (req, res) {
            var condition = null
            if (req.body.keyword != ' ') {
                condition = {
                    name: new RegExp(req.body.keyword, 'i'),
                    type: req.body.type
                }
            }
            hashtag.find(condition, (err, docs) => {
                res.send(docs)
            })
        },
        addHashtag: function (req, res) {
            var name = req.body.name
            var type = req.body.type
            linking.insertMany({
                Object: {
                    name: name,
                    type: type
                },
                pointId: req.body.postId
            }, (err, docs) => {
                res.send(docs)
            })
        },
        removeHashtag: function (req, res) {
            var name = req.body.name
            var type = req.body.type
            linking.findOneAndRemove({
                "Object.name": name,
                "Object.type": type,
                "pointId": req.body.postId
            }, (err, docs) => {
                res.send(docs)
            })
        },
        getContent: function (req, res) {
            content.findOne({
                postId: req.body.postId,
                type: req.body.type,
            }, (err, docs) => {
                res.send(docs)
            })
        },
        updateContent: function (req, res) {
            var type = req.body.type
            var delta = JSON.parse(req.body.delta)
            post.findByIdAndUpdate(req.body.postId, {
                modifyDate: Date(),
                description: req.body.description.slice(0, 200) + '...'
            }, (err, docs) => {
            })
            content.findOneAndUpdate({
                postId: req.body.postId,
                type: type,
            }, {
                modifyDate: Date(),
                delta: delta
            }, (err, docs) => {
                console.log(docs)
                res.send(docs)
            })
        },
        updateImage: function (req, res) {
            post.findById(req.params.id, (err, docs) => {
                docs.modifyDate = Date()
                upload.delete(docs.images)
                docs.images = req.body.files
                docs.save(err => {
                    res.redirect('/ad/editPost/' + req.params.id)
                })
            })

        }
    },
    editProduct: {
        render: function (req, res) {
            Promise.all([
                new Promise((rs, rj) => {
                    product.findById(req.params.id, (err, docs) => {
                        rs(docs)
                    })
                }),
                new Promise((rs, rj) => {
                    linking.find({ pointId: req.params.id }, (err, docs) => {
                        rs(docs)
                    })
                })
            ])
                .then(rst => {
                    var attributes = config.product.attribute
                    attributes.forEach(attr => {
                        attr.values = []
                        rst[1].forEach(linking => {
                            if (linking.Object && linking.Object.type == attr.type) {
                                attr.values.push(linking.Object)
                            }
                        })
                    })
                    var informations = config.product.information
                    res.render('client/pages/editProduct', {
                        product: rst[0],
                        attributes: attributes,
                        informations: informations
                    })
                })

        },
        updateImage: function (req, res) {
            product.findById(req.params.id, (err, docs) => {
                docs.modifyDate = Date()
                upload.delete(docs.images)
                docs.images = req.body.files
                docs.save(err => {
                    res.redirect('/ad/editProduct/' + req.params.id)
                })
            })

        },
        createAttribute: function (req, res) {
            var name = req.body.name
            var type = req.body.type
            attribute.insertMany({
                name: name,
                type: type
            }, (err, docs) => {
                res.send(docs)
            })
        },
        deleteAttribute: function (req, res) {
            var id = req.body.id
            attribute.findByIdAndRemove(id, (err, docs) => {
                res.send(docs)
            })
        },
        searchAttribute: function (req, res) {
            var condition = null
            if (req.body.keyword != ' ') {
                condition = {
                    name: new RegExp(req.body.keyword, 'i'),
                    type: req.body.type
                }
            }
            attribute.find(condition, (err, docs) => {
                res.send(docs)
            })
        },
        addAttribute: function (req, res) {
            var name = req.body.name
            var type = req.body.type
            linking.insertMany({
                Object: {
                    name: name,
                    type: type
                },
                pointId: req.body.productId
            }, (err, docs) => {
                res.send(docs)
            })
        },
        removeAttribute: function (req, res) {
            var name = req.body.name
            var type = req.body.type
            linking.findOneAndRemove({
                "Object.name": name,
                "Object.type": type,
                "pointId": req.body.productId
            }, (err, docs) => {
                res.send(docs)
            })
        },
        getInformation: function (req, res) {
            information.findOne({
                productId: req.body.productId,
                type: req.body.type,
            }, (err, docs) => {
                res.send(docs)
            })
        },
        updateInformation: function (req, res) {
            var type = req.body.type
            var delta = JSON.parse(req.body.delta)
            information.findOneAndUpdate({
                productId: req.body.productId,
                type: type,
            }, {
                modifyDate: Date(),
                delta: delta
            }, (err, docs) => {
                console.log(docs)
                res.send(docs)
            })
        },
    },
    login: {
        render: function (req, res) {
            res.render('client/pages/login', {
                message: req.flash('loginMessage')[0]
            })
        }
    },
    loginRequire: {
        render: function (req, res) {
            res.render('client/pages/login-require')
        }
    },
    signup: {
        render: function (req, res) {
            res.render('client/pages/signup', {
                message: req.flash('signupMessage')[0]
            })
        }
    }
}
