const express = require('express')
const app = express()
const PORT = 2121
const loginRoutes = require('./routes/login')
const hodRoutes = require('./routes/hod')
const facultyRoutes = require('./routes/faculty')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', loginRoutes)
app.use('/hod', hodRoutes)
app.use('/faculty', facultyRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})