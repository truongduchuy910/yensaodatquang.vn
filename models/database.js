var { user, post, product, quill, hashtag } = require('../database/database')
module.exports = {
    post: {
        find: function (req, res) {
            post.findById(req.params.id, (err, docs) => {
                res.send(docs)
            })
        }
    },
    quill: {
        findByContentId: function (req, res) {
            quill.findOne({
                pointId: req.params.id
            }, (err, docs) => {
                res.send(docs)
            })
        },
        saveByContentId: function (req, res) {
            quill.findOneAndUpdate({
                pointId: req.params.id
            }, {
                delta: req.query.delta
            }, (err, docs) => {
                res.send(docs)
            })
        },
        update: function (req, res) {
            if (req.body) {
                quill.findOneAndUpdate(
                    {
                        pointId: req.params.id
                    },
                    {
                        delta: JSON.parse(req.body.delta)
                    },
                    (err, docs) => {
                        res.send(docs)
                    })
            } else {
                res.send()
            }

        }
    },
    hashtag: {
        findAllHashtag: function (req, res) {
            hashtag.find({}, (err, docs) => {
                res.send(docs)
            })
        }
    }
}