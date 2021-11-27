const express = require("express");
const app = express();

/*require("./models/Doctor.js");*/

//Routes
const index = require("./routes/index")

const doctors = require("./routes/doctors")


app.use(express.json());
app.use(function(req, res, next){
    res.header ("Access-Control-Allow-Origin", "*");
    res.header ("Access-Control-Allow-Hearders", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
});

app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers")
    res.header(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    );
    res.send("send some thing whatever")
})

app.use("/", index)

app.use("/doctors", doctors)

module.exports = {
    app
}