const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const transaksi = model.transaksi


//endpoint untuk menyimpan data admin, METHOD: POST, function: create
//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", (req,res) => {
    transaksi.findAll()
        .then(result => {
            res.json({
                transaksi : result
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
        tgl_transaksi : req.body.tgl_transaksi,
        id_user : req.body.id_user,
        id_meja : req.body.id_meja,
        nama_pelanggan : req.body.nama_pelanggan,
        status : req.body.status
    }

    transaksi.create(data)
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
        id_transaksi : req.params.id
    }
    let data = {
        tgl_transaksi : req.body.tgl_transaksi,
        id_user : req.body.id_user,
        id_meja : req.body.id_meja,
        nama_pelanggan : req.body.nama_pelanggan,
        status : req.body.status
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
        id_transaksi : req.params.id
    }
    transaksi.destroy({where: param})
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

