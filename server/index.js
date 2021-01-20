const express = require("express")
const adminRouter = require('./router/admin')
const db = require('./plugins/db')
const app = express()
app.use(require('cors')())
app.use(express.json())

app.use('/uploads',express.static('uploads'))
db(app)
// app.use(adminRouter(app))
adminRouter(app)
app.listen(3000,()=>{
  console.log("App listening on port 3000")
  console.log("http://localhost:3000")
})