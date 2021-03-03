const express = require('express')
const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')


const user = require('../models/user')
const report = require('../models/report')
const router = express.Router()

//ver info de usuario
router.get('/:id', async(req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(200).send({ success: false, message: 'ID no válido' })
    try {
        const ThisUser = await user.findById(req.params.id).select('-hashPass').exec()
        if (!ThisUser) return res.status(200).send({ success: false, message: 'El usuario no existe' })
        return res.status(200).send({ success: true, user: ThisUser })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ success: false, message: 'Internal error' })
    }
})

//registro
router.post('/', async(req, res, next) => {
    try {
        const CheckUser = await user.findOne({ name: req.body.name }).exec()
        if (CheckUser) return res.status(200).send({ success: false, message: 'El usuario ya existe, prueba otro nombre' })
        const newUser = new user({
            name: req.body.name,
            hashPass: bcryptjs.hashSync(req.body.pass, 10),
        })
        const newUserS = await newUser.save()
        if (!newUserS) return res.status(200).send({ success: false, message: 'Error guardando el usuario' })
        return res.status(200).send({ success: true, id: newUserS._id })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ success: false, message: 'Internal error' })
    }
})

//inicio de sesión
router.post('/login', async(req, res, next) => {
    try {
        const User = await user.findOne({ name: req.body.name }).exec()
        if (!User) return res.status(200).send({ success: false, message: 'El usuario no existe' })
        if (bcryptjs.compareSync(req.body.pass, User.hashPass)) {
            return res.status(200).send({ success: true, id: User._id })
        }
        return res.status(200).send({ success: false, message: 'Contraseña incorrecta' })
    } catch (error) {
        console.log(error)
        return res.send({ error })
    }
})

router.delete('/:id', async(req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(200).send({ success: false, message: 'ID no válido' })
    try {
        const User = await user.findById(req.params.id).exec()
        if (!User) return res.status(200).send({ success: false, message: 'El usuario no existe' })
        await report.deleteMany({ owner: req.params.id }).exec()
        await user.findByIdAndDelete(req.params.id).exec()
        return res.status(200).send({ success: true, message: 'Borrado el usuario y sus registros' })
    } catch (error) {
        console.log(error)
        return res.send({ success: false, message: 'Internal error' })
    }
})


module.exports = router