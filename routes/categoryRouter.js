const router = require('express').Router()
const categoryCtrl  = require('../controllers/categoryCtrl');

router.get('/category',categoryCtrl.getCategories)




module.exports = router
