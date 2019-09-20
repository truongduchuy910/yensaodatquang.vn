var fs = require('fs')
var formidable = require('formidable')

module.exports = {
    handPost: function (req, res, next) {
        var form = new formidable.IncomingForm()
        var path = `./public/upload/${Math.floor(Math.random() * Math.floor(999999999999)).toString()}`
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
                throw err
            } else {
                form.uploadDir = path
                form.keepExtensions = true
                form.maxFieldsSize = 3 * 1024 * 1024
                form.maxFieldsSize = 3 * 1024 * 1024
                form.parse(req, function (err, fields, files) {
                    if (err) {
                    }
                    else {
                        fs.readdir(path, (err, files) => {
                            if (err) {
                            } else {
                                var url = [];
                                files.forEach(file => {
                                    url.push(path.slice(8, path.length) + '/' + file)
                                })
                                req.body = {
                                    fields: fields,
                                    files: url
                                }
                                next()
                            }
                        })
                    }
                })
            }
        })

    },
    delete: function (filesPath) {
        filesPath.forEach(path => {
            fs.unlink('./public' + path, err => {
                if (err) throw err;
                console.log('delete file ./public' + path)
            })
        })
        fs.readdir('./public/upload', (err, docs) => {
            docs.forEach(folder => {
                fs.readdir('./public/upload/' + folder, (err, docs) => {
                    if (docs.length == 0) {
                        fs.rmdir('./public/upload/' + folder, (err, docs) => {
                            console.log('remove direction ./public/upload/' + folder)
                        })
                    }
                })
            })
        })
    }
}


