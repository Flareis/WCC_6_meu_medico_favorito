const Doctor = require("../models/Doctor")

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const doctor = await Doctor.create({ name, crm, specialty, clinic, phone, favorite });
        console.log(`Medico ${doctor.name} criado`);
        res.status(201).send(doctor)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite
    try {
        const where = favorite ? { where: { favorite } } : {} // retorna favorito ou retorna vazio (nada)
        const doctors = await Doctor.findAll(where)
        if (doctors && doctors.length > 0){
            res.status(200).send(doctors)
         } else {
                res.status(204).send(); // 204:sucesso, sem retornar nenhume conteúdo
         }
        } catch(error){
            res.status(500).send({message: error.message })
        }
}

const getDoctor = async (req, res) => {
    const doctorId = req.params.id
    try{
        const doctor = await Doctor.findOne({
            where: {id: doctorId}
        });
        if (doctor){
            res.status(200).send(doctor)
        } else {
            res.status(404).send({message: `Médico não encontrado com o id ${doctorId}`})
        }
    } catch(error) {
        res.status(500).send({ message: error.message})
    }
}

//Função de entrada
const updateDoctor = async(req, res) =>{
    const doctorId = req.params.id
    const {name, crm, specialty, clinic, phone, favorite  } = req.body // desestruturação
    try {
        const  rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite},{
        where: {id: doctorId }
    });
    if (rowsUpdated && rowsUpdated[0] > 0){
        res.status(200).send({message: `O médico com id: ${doctorId} foi alterado.`})
    } else {
        res.status(404).send({ message: `Não foi encontrado o médido com id: ${doctorId}`})
    } 
}catch(error) {
     res.status(500).send ({message: error.message})
    }  
}
 
// Criando a função patch
const updateFavorite = async (req, res) => {
    const doctorId = req.params.id
    const favorite = req.body.favorite
    try{
        const updatedRows = await Doctor.update ({favorite}, {where: {id: doctorId}
        });
        if (updatedRows && updatedRows[0] > 0 ){
            res.status(200).send({message: `${updatedRows[0]} médico foi atualizado com sucesso.`})
        } else { 
            res.status(404).send({message: `Médico com o id ${doctorId} não foi encontrado.`})
        }
    } catch (error){
        res.status(500).send({message: error.message})
    }
}

//Deletando um médico cadastrato
const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id
    try{
        const rowDeleted = await Doctor.destroy ({where: {id: doctorId}})
        if (rowDeleted){
            res.status(200).send({message: `${rowDeleted} médico deletado com sucesso.`})
        } else {
            res.status(404).send({ message: `Médico com o id: ${doctorId} não encontrado.`})
        }
    } catch(error){
        res.status(500).send({message: error.message})
    }
}


// Exportando as rotas
module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    updateFavorite,
    deleteDoctor
}