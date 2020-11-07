const express = require("express")
const app = express()
const jwt = require("jsonwebtoken") // npm install jsonwebtoken
const md5 = require("md5")

// model petugas
const admin = require("../../models/index").admin
const pelanggan = require("../../models/index").pelanggan
const SECRET_KEY_ADMIN = "Admin"
const SECRET_KEY_USER = "User"

app.use(express.urlencoded({extended: true}))


app.post("/login", async (req, res) => {
    let parameter = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let puser = await pelanggan.findOne({where: parameter})
    let padmin = await admin.findOne({where:parameter})
    let jwtHeader = {
        algorithm: "HS256",
        expiresIn: "1h"
    }
    if(padmin){
        let payload = JSON.stringify(padmin)
        return res.json({
            data: padmin,
            token : jwt.sign(payload, SECRET_KEY_ADMIN)
        })
    }else if(puser){
        let payload = JSON.stringify(puser)
        return res.json({
            data:puser,
            token: jwt.sign(payload,SECRET_KEY_USER)
        })
    }else{
        res.json({
            message: "Invalid Username or Password"
        })
    }
}) 


module.exports = app