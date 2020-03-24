const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var Clientcontroller = require('./Clients.controller');


router.get('/get-all',Clientcontroller.get_all_ClientModals);
router.post('/create',Clientcontroller.create_a_ClientModal);
router.get('/getByUserId/:Id',Clientcontroller.getByUserId);
router.post('/update/:Id',Clientcontroller.update_a_ClientModal);
router.post('/delete/:Id',Clientcontroller.Delete_a_ClientModal);






module.exports = router;