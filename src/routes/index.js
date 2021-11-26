const express = require ("express");
const router = express.Router();

router.get("/", function (req, res){
    res.status(200).send({
        tittle: "Minha API Rest Node.js",
        version: "1.0.0"
    })
})

module.exports = router