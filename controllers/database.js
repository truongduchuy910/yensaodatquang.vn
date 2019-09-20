var database = require('../models/database')
module.exports = function (app) {
    app
        .post('/ad/database/findByContentId/:id', database.quill.findByContentId)
        .post('/database/findByContentId/:id', database.quill.findByContentId)
        .post('/ad/database/updateQuillContent/:id', database.quill.update)
        .post('/database/findAllHashtag', database.hashtag.findAllHashtag)
}