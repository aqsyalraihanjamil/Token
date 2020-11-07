const express = require("express")
const app = express()
const md5 = require("md5")

//memanggil model
const pelanggan = require("../models/index").pelanggan
//const tarif = require("../models/index").tarif

//middleware agar bisa mengenali request dari body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    //execute get
    let data = await pelanggan.findAll({
        include : ["tarif"]
    })
    res.json({
        data:data
    })
})
app.post("/",(req,res)=>{
    let data = {
        username:req.body.username,
        password : md5(req.body.password),
        nomor_kwh:req.body.nomor_kwh,
        nama_pelanggan:req.body.nama_pelanggan,
        alamat:req.body.alamat,
        id_tarif:req.body.id_tarif
    }
    //execute buat
    pelanggan.create(data)
    .then(result =>{
        res.json({
            message : "data has been inserted",
            data : result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
app.put("/",(req,res)=>{
    let data = {
        username:req.body.username,
        password : md5(req.body.password),
        nomor_kwh:req.body.nomor_kwh,
        nama_pelanggan:req.body.nama_pelanggan,
        alamat:req.body.alamat,
        id_tarif:req.body.id_tarif,
    }
    let param = {
        id_pelanggan : req.body.id_pelanggan
    }
    //execute update
    pelanggan.update(data,{where:param})
    .then(result=>{
        res.json({
            message : "data has been updated",
            data: data
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})
app.delete("/:id_pelanggan",async(req,res) =>{
    let id_pelanggan = req.params.id_pelanggan //variabel
    let param = {
        id_pelanggan : id_pelanggan
    }
    //execute delete
    pelanggan.destroy({where:param})
    .then(result=>{
        res.json({
            message : "data has been delete",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})

module.exports=app