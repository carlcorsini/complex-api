const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(bodyParser.json())


const costumeRoutes = require('./src/routes/costumes.js')
const tagsRoutes = require('./src/routes/tags.js')

app.use('/costumes', costumeRoutes)

app.use('/costumes/tags', tagsRoutes)

app.use('/costumes/:id/tags', tagsRoutes)

app.use((err, req, res, next) => {
  res.status(err.status).json(
    err
  )
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Snacks are running on port ${port}!`)
  })
}
module.exports = app