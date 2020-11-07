const express = require("express")
const app = express()

//memanggil model
const level = require("../models/index").level
const verifyAdmin = require("./auth/verifyAdmin")
app.use(verifyAdmin)
//middleware agar bisa mengenali request dari body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    //execute get
    level.findAll()
    .then(result =>{
        res.json(result)
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})
app.post("/",(req,res)=>{
    let data = {
        nama_level : req.body.nama_level
    }
    //execute buat
    level.create(data)
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
        nama_level : req.body.nama_level
    }
    let param = {
        id_level : req.body.id_level
    }
    //execute update
    level.update(data,{where:param})
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
app.delete("/:id_level",async(req,res) =>{
    let id_level = req.params.id_level //variabel
    let param = {
        id_level : id_level
    }
    //execute delete
    level.destroy({where:param})
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