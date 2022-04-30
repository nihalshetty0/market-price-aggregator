const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')

const PORT = 3000 || process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/reports', require('./routes/reports'))

// connect to DB
mongoose.connect(process.env.MONGOURI,
    { useNewUrlParser: true , useUnifiedTopology : true},
    ()=>console.log(`Connected to DB`))


app.listen(3000, ()=>console.log(`Server started @ PORT ${PORT}`))