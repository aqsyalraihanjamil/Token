const express = require("express")
const app = express()

//memanggil model
const tarif = require("../models/index").tarif

//middleware agar bisa mengenali request dari body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    //execute get
    tarif.findAll()
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
        daya : req.body.daya,
        tarifperkwh : req.body.tarifperkwh
    }
    //execute buat
    tarif.create(data)
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
        daya : req.body.daya,
        tarifperkwh : req.body.tarifperkwh
    }
    let param = {
        id_tarif : req.body.id_tarif
    }
    //execute update
    tarif.update(data,{where:param})
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
app.delete("/:id_tarif",async(req,res) =>{
    let id_tarif = req.params.id_tarif //variabel
    let param = {
        id_tarif : id_tarif
    }
    //execute delete
    tarif.destroy({where:param})
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