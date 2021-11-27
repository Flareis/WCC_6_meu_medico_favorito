const express = require("express")
const router = express.Router()
const controller = require("../controllers/doctorsController")

//Rota que cria os médicos
router.post("/", controller.createDoctor)

//Rota que retorna os médicos
router.get("/", controller.getAllDoctors)

//Rota que retorna médicos por ID
router.get("/:id", controller.getDoctor)

//Rota de put que altera a estrutura do Doctor
router.put("/:id", controller.updateDoctor)

//Rota patch para modificar uma informação apenas
router.patch("/:id/favorite", controller.updateFavorite)

//Rota para deletar um médico específico
router.delete("/:id/doctor", controller.deleteDoctor)

module.exports = router;