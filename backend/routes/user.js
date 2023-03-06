const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const user = model.user


//endpoint untuk menyimpan data admin, METHOD: POST, function: create
//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", (req,res) => {
    user.findAll()
        .then(result => {
            res.json({
                user : result
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
        nama_user : req.body.nama_user,
        role : req.body.role,
        username : req.body.username,
        password : md5(req.body.password)
    }

    user.create(data)
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
        id_user : req.params.id
    }
    let data = {
        nama_user : req.body.nama_user,
        role : req.body.role,
        username : req.body.username,
        password : md5(req.body.password)
    }
    user.update(data, {where: param})
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
        id_user : req.params.id
    }
    user.destroy({where: param})
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

