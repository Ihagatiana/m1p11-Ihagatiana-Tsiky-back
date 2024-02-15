const express = require("express");
const router = express.Router();
const employesService = require('./employes.service');
const employesModel = require('./employes.model');

//const storage = multer.memoryStorage();
//const upload = multer({ storage: storage }); 

router.get("/",async (req, res) => {
    try {
      const employes = await employesService.findAll({});
      res.status(200).json(employes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get("/:id",async (req, res) => {
  const employesId = req.params.id;
  try {
    const employes =  await employesService.findById({ _id: employesId });
    res.status(200).json(employes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', upload.array('photos'), async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;
    const imageBuffers = req.files ? req.files.map(file => file.buffer) : null;
    const files = req.files;
    const newService = await servicesService.create(name, price, duration, description, imageBuffers,files);
    res.status(201).send(newService);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.put("/:id", upload.array('photos'), async (req, res) => {
  try {
    const employeId = req.params.id;
    const imagesBuffers = req.files ? req.files.map(file => file.buffer) : null; 
    const otherServiceData = {
      name: req.body.name,
      firstname: req.body.firstname, 
      starttime: req.body.starttime,
      endtime: req.body.endtime
    };
    const file = req.files;

    const updatedEmploye =  await employesService.updateById(serviceId, imagesBuffers, otherServiceData, file);
    res.status(200).send(updatedEmploye);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating employe.');
  }
});

router.delete("/:id", async (req, res) => {
  const employeId = req.params.id;
  try {
    await employesService.deleteById(employeId);
    res.status(200).json({ message: 'Employe deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;