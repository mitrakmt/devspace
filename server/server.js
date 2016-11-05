let express = require('express')
let app = express()
let logger = require('morgan')
let bodyParser = require('body-parser')
let path = require('path')
let cors = require('cors')
let rootRouter = require('./routers')
let db = require('./db')
let PORT = process.env.PORT || 8000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, '../client')))

app.use('/api', rootRouter)

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})
