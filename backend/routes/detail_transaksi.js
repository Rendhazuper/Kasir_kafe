const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const detail_transaksi = model.detail_transaksi


//endpoint untuk menyimpan data admin, METHOD: POST, function: create
//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", (req,res) => {
    detail_transaksi.findAll()
        .then(result => {
            res.json({
                detail_transaksi : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", (req,res) => {
    let data = {
        id_transaksi : req.body.id_transaksi,
        id_menu : req.body.id_menu,
        harga: req.body.harga
    }

    detail_transaksi.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/:id", (req,res) => {
    let param = {
        id_detail_transaksi : req.params.id
    }
    let data = {
        id_transaksi : req.body.id_transaksi,
        id_menu : req.body.id_menu,
        harga: req.body.harga
    }
    transaksi.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", (req,res) => {
    let param = {
        id_detail_transaksi : req.params.id
    }
   detail_transaksi.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app

