const express = require("express")
const router = express.Router()
const controller = require("../controllers/doctorsController")

router.post("/", controller.createDoctor)
router.get("/", controller.getAllDoctors)
router.get("/:id", controller.getDoctor)

module.exports = router;