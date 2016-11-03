let express = require('express')
let app = express()
let logger = require('morgan')
let bodyparser = require('body-parser')
let rootRouter = require('./routers')
let PORT = process.env.PORT || 8000

require('dotenv').config()

app.use(logger('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use('/api', rootRouter)

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})
