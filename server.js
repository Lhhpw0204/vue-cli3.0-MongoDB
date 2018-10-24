const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")

// 使用body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 引入users.js
const users = require("./routes/api/users")
const profiles = require("./routes/api/profiles")

//DB
const db = require("./config/keys").mongoURI

//connnect to db
mongoose.connect(db)
.then(() => {
	console.log("MongoDB connected")
})
.catch(err => {
	console.log(err);
})

// passport初始化
app.use(passport.initialize())
require("./config/passport")(passport)

app.get("/",(req,res) => {
	res.send("hello world！")
})

//使用routes
app.use("/api/users",users)
app.use("/api/profiles",profiles)

const port = process.env.port || 5000

app.listen(port,() => {
	console.log(`Server running on port ${port}`)
})