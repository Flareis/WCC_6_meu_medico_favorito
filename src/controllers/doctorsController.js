const Doctor = require("../models/Doctor")

const createDoctor = async (req, res) => {
    const { name, CRM, speciality, clinic, phone, favorite } = req.body
    try {
        const doctor = await Doctor.create({ name, CRM, speciality, clinic, phone, favorite });
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
    const {name, CRM, speciality, clinic, phone, favorite  } = req.body // desestruturação
    try {
        const  rowsUpdated = await Doctor.update({ name, CRM, speciality, clinic, phone, favorite},{
        where: {id: doctorId }
    });
    if (rowsUpdated && rowsUpdated > 0){

        res.status(200).send({message: `${rowsUpdated[0]} médicos foram alterados.`})
    } else {
        res.status(404).send({ message: `Não foi encontrado o médido com id: ${doctorId}`})
    } 
}catch(error) {
     res.status(500).send ({message: error.message})
    }  
}
    

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor
}