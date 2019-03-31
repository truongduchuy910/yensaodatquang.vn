//nodemon --exec "heroku local" --signal SIGTERM

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index.ejs'))
  .get('/camket', (req, res) => res.render('pages/camket.ejs', {
    company: {
      name: "Yến Sào Đất Quảng",
      logo: "/images/logos/Logo-white.png",
    },
    product: []

  }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))