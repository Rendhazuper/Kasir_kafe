const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const menu = model.menu


//endpoint untuk menyimpan data admin, METHOD: POST, function: create
//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", (req,res) => {
    menu.findAll()
        .then(result => {
            res.json({
                menu : result
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
        nama_menu : req.body.nama_menu,
        jenis : req.body.jenis,
        deskripsi : req.body.deskripsi,
        gambar: req.body.gambar,
        harga : req.body.harga
    }

    menu.create(data)
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
        id_menu : req.params.id
    }
    let data = {
        nama_menu : req.body.nama_menu,
        jenis : req.body.jenis,
        deskripsi : req.body.deskripsi,
        gambar : req.body.gambar,
        harga : req.body.harga
    }
    menu.update(data, {where: param})
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
        id_menu : req.params.id
    }
    menu.destroy({where: param})
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

