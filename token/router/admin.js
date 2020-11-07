const express = require("express")
const app = express()
const md5 = require("md5")

//memanggil model
const admin = require("../models/index").admin
//const tarif = require("../models/index").tarif

//middleware agar bisa mengenali request dari body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    //execute get
    let data = await admin.findAll({
        include : ["level"]
    })
    res.json({
        data:data
    })
})
app.post("/",(req,res)=>{
    let data = {
        username : req.body.username,
        password : md5(req.body.password),
        nama_admin : req.body.nama_admin,
        id_level : req.body.id_level
    }
    //execute buat
    admin.create(data)
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
        username : req.body.username,
        password : md5(req.body.password),
        nama_admin : req.body.nama_admin,
        id_level : req.body.id_level
    }
    let param = {
        id_admin : req.body.id_admin
    }
    //execute update
    admin.update(data,{where:param})
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
app.delete("/:id_admin",async(req,res) =>{
    let id_admin = req.params.id_admin //variabel
    let param = {
        id_admin : id_admin
    }
    //execute delete
    admin.destroy({where:param})
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