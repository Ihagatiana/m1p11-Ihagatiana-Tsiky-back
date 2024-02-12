const express = require("express");
const router = express.Router();
const servicesService = require('./services.service');
const servicesModel = require('./services.model');

router.get("/",async (req, res) => {
    try {
      const services = await servicesService.findAll();
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get("/:id",async (req, res) => {
  const servicesId = req.params.id;
  try {
    const services = await servicesService.findOne({ _id: servicesId });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post("/",  async (req, res) => {
  const { name, price, duration, description } = req.body;
  try {
    const newService = new servicesModel({ name, price,duration, description });
    const savedService = await servicesService.create(newService);
    res.status(201).json(savedService);
  } catch (err) { 
    console.error('Error creating service:', err);
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const serviceId = req.params.id;
  const updateData = req.body;
  try {
    const updatedService = await servicesService.updateById(serviceId, updateData);
    if (updatedService) {
      res.status(200).json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete("/:id", async (req, res) => {
  const serviceId = req.params.id;
  try {
    const deletedService = await servicesService.deleteById(serviceId);
    if (deletedService) {
      res.status(200).json({ message: 'Service deleted successfully' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;