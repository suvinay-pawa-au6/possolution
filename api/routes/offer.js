const express = require('express')
const router = express.Router();
const offercontroller = require('../../controller/offercontroller')

router.get('/',(req,res,next)=>{
    console.log("Welcome offers")
})
router.get('/:oId',offercontroller.alloffers);
router.post('/',offercontroller.addeoffers);
router.patch('/:oId',offercontroller.updateoffers);
router.delete('/:oId',offercontroller.deleteoffers);

module.exports=router;