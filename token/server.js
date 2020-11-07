const express = require('express')
const app = express()

//call router
let admin = require("./router/admin")
let auth = require('./router/auth/auth')
let level = require('./router/level')
let pelanggan = require('./router/pelanggan')
let pembayaran = require('./router/pembayaran')
let penggunaan = require('./router/penggunaan')
let tagihan = require('./router/tagihan')
let tarif = require('./router/tarif')
let loginadmin = require('./router/auth/verifyAdmin')
let loginuser = require('./router/auth/verifyUser')

/*

app.use("/auth",auth)

*/
app.use("/tarif",tarif)
app.use("/pelanggan", pelanggan)
app.use("/penggunaan",penggunaan)
app.use("/tagihan",tagihan)
app.use("/level",level)
app.use("/admin", admin)
app.use("/pembayaran",pembayaran)
app.use("/loginadmin",loginadmin)
app.use('/auth',auth)

app.listen(8000, () => {
    console.log("Well yes, its work")
})