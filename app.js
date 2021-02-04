require('dotenv').config()
const express = require('express')
const cors = require('cors')
const chalk = require('chalk')
const database = require('./src/utils/database/database')
const userRouters = require('./src/routes/User')
const uploadRouter = require('./src/utils/storage/storage')

//Requiring models for now, to be deleted later
const all_models = require('./src/models/all_models')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(userRouters)
app.use(uploadRouter)

app.get('/', async (req, res) => {
    res.status(200).send('Hello, world!').end()
})

app.listen(port, () => {
    console.log(chalk.keyword('green')('Server is up on port ' + port))
})

database.sync({
    force: false,
    alter: true
})
    .then(()=>{
        console.log(chalk.keyword('green')('Successfully synced to database'))
    })
    .catch((err) => {
        console.log(chalk.keyword('red')('Failed to sync to database'))
        console.error(err)
    })

module.exports = app
