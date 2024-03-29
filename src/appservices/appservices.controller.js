const express = require("express");
const router = express.Router();
const appservicesService = require('./appservices.service');
const appservicesModel = require('./appservices.model');
const mongoose = require('mongoose');

router.get("/",async (req, res) => {
    try {
      const appservices = await appservicesService.findAll({
        limit: req.query?.limit,
        offset: req.query?.offset,
      });
      res.status(200).json(appservices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}); 

router.get("/:id",async (req, res) => {
  const appservicesId = req.params.id;
  try {
    const appservices =  await appservicesService.findById({ _id: appservicesId });
    res.status(200).json(appservices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/",async (req, res) => {
  console.log(req.body.clients);
  const appointmentData = {
    date: req.body.date,  
    clients: new mongoose.Types.ObjectId(req.body.clients),        
    starttime: req.body.starttime
  }
  const appServiceDataList = req.body.appservices;
  try {
    const appservices =  await appservicesService.create(appointmentData,appServiceDataList);
    res.status(200).json(appservices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/validate",async (req, res) => {
  const idAppointmentTab =  req.body.appointmentIds;
  try {
    const result =  await appservicesService.validate(idAppointmentTab);
    res.status(200).json({ message: result.message});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/*
router.put("/",async (req, res) => {
  const appointmentId = req.params.id;
  const appointmentData = {
    date: req.body.date,  
    clients: new mongoose.Types.ObjectId(req.body.clients),        
    starttime: req.body.starttime
  }
  const appServiceDataList = req.body.appservices;
  try {
    const appservices =  await appservicesService.updateById(appointmentId,appointmentData,appServiceDataList);
    res.status(200).json(appservices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
*/

module.exports = router;