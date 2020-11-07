const express = require("express")
const app = express()

//memanggil model
const penggunaan = require("../models/index").penggunaan

//middleware agar bisa mengenali request dari body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    //execute get
    penggunaan.findAll({
        include:["pelanggan"]
    })
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
        id_pelanggan:req.body.id_pelanggan,
        bulan:req.body.bulan,
        tahun:req.body.tahun,
        meter_awal:req.body.meter_awal,
        meter_akhir:req.body.meter_akhir,
    }
    //execute buat
    penggunaan.create(data)
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
        id_pelanggan:req.body.id_pelanggan,
        bulan:req.body.bulan,
        tahun:req.body.tahun,
        meter_awal:req.body.meter_awal,
        meter_akhir:req.body.meter_akhir
    }
    let param = {
        id_penggunaan : req.body.id_penggunaan
    }
    //execute update
    penggunaan.update(data,{where:param})
    .then(result=>{
        res.json({
            message : "data has been updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message : error.message
        })
    })
})
app.delete("/:id_penggunaan",async(req,res) =>{
    let id_penggunaan = req.params.id_penggunaan //variabel
    let param = {
        id_penggunaan : id_penggunaan
    }
    //execute delete
    penggunaan.destroy({where:param})
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