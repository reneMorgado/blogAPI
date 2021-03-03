const express = require('express')
const mongoose = require('mongoose')
const report = require('../models/report')
const user = require('../models/user')
const router = express.Router()


router.get('/:userID/amount', async(req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.userID)) return res.status(200).send({ success: false, message: 'ID no válido' })
    try {
        const users = await user.findById(req.params.userID).exec()
        if (!users) return res.status(200).send({ succes: false, message: 'El usuario no existe' })
        const reports = await report.find({ owner: users._id }).select('amount').exec()
        let balance = 0
        reports.map((rec) => {
            balance = balance + rec.amount
        })
        return res.status(200).send({ success: true, balance })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ success: false, message: 'Internal error' })
    }
})

router.get('/:userID', async(req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.userID)) return res.status(200).send({ success: false, message: 'ID no válido' })
    try {
        const ThisUser = await user.findById(req.params.userID).exec()
        if (!ThisUser) return res.status(200).send({ success: false, message: 'El usuario no existe' })
        const reports = await report.find({ owner: req.params.userID }).exec()
        return res.status(200).send({ success: true, reports })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ success: false, message: 'Internal error' })
    }
})


router.post('/:userID', async(req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.userID)) return res.status(200).send({ success: false, message: 'ID no válido' })
    try {
        const CurrentUser = await user.findById(req.params.userID).exec()
        if (!CurrentUser) return res.status(200).send({ success: false, message: 'El usuario no existe' })
        let money = req.body.operation === 'Egreso' ? req.body.amount * -1 : req.body.amount
        const newReport = new report({
            operation: req.body.operation,
            amount: money,
            owner: req.params.userID,
            desc: req.body.desc
        })
        const newReports = await newReport.save()
        if (!newReports) return res.status(200).send({ success: false, message: 'Error guardando' })
        return res.status(200).send({ success: true, created: newReports })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ success: false, message: 'Id no válido' })
    }
})

router.delete('/:userID/:id', async(req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.userID)) return res.status(200).send({ success: false, message: 'ID no válido' })
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(200).send({ success: false, message: 'ID no válido' })
    try {
        const CurrentUser = await user.findById(req.params.userID).exec()
        if (!CurrentUser) return res.status(200).send({ success: false, message: 'El usuario no existe' })
        const reports = await report.findByIdAndDelete(req.params.id)
        if (!reports) return res.status(200).send({ success: false, message: 'El elemento no existe' })
        return res.status(200).send({ success: true, message: 'Deleted' })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ success: false, message: 'Internal error' })
    }
})

module.exports = router