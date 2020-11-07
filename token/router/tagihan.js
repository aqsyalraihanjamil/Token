const express = require("express")
const app = express()

//memanggil model
const tagihan = require("../models/index").tagihan
const penggunaan = require("../models/index").penggunaan

//middleware agar bisa mengenali request dari body
app.use(express.urlencoded({extended:true}))

app.get("/",async(req,res)=>{
    //execute get
    tagihan.findAll({
        include : ["penggunaan"]
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
app.post("/",async (req,res)=>{
    let param = {
        id_penggunaan:req.body.id_penggunaan
    }
    let p = await penggunaan.findOne({where:param})
    let meter_awal = p.meter_awal
    let meter_akhir = p.meter_akhir
    let jumlah_meter = meter_akhir - meter_awal
    let data = {
        id_penggunaan:req.body.id_penggunaan,
        bulan:req.body.bulan,
        tahun:req.body.tahun,
        jumlah_meter:jumlah_meter,
        status:0,
    }
    //execute buat
    tagihan.create(data)
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
        status : req.body.status
    }
    let param = {
        id_tagihan : req.body.id_tagihan
    }
    //execute update
    tagihan.update(data,{where:param})
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
app.delete("/:id_tagihan",async(req,res) =>{
    let id_tagihan = req.params.id_tagihan //variabel
    let param = {
        id_tagihan : id_tagihan
    }
    //execute delete
    
    tagihan.destroy({where:param})
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