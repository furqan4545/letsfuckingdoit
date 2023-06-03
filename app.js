const express = require("express");
// var dateFormat = require("dateformat");
const cors = require("cors");
// const client = require("./db");
const sendEmail = require("./sendmail");

const app = express();

// middle ware
app.use(cors());
app.use(express.json());   // req.body()


app.post("/sendAlert", async(req, res) => {
    
    try {
        // console.log(req.body);
        const {receiver1} = req.body;
        // const {receiver2} = req.body;
        // const {receiver3} = req.body;
        const {from} = req.body;
        const {message} = req.body;
        // const {otp} = req.body;

        var mailList = [
            receiver1,
            // receiver2,
            // receiver3
        ]
        // send Verification Code via email. 
        sendEmail(message, from, mailList);
        console.log(message);
        res.json({
            "msg": "The alert has been sent to the emails.",
            "status" : 200
        });  

    } catch (error) {
        console.log("Error is: ", error);
        res.status(400).send(error);
    }

});



// database connection here. //
async function dbStart() {
    try { 
        // await client.connect();
        console.log("DB connected successfully.");
        // await client.query("");
    }
    catch (e) {
        console.error(`The error has occured: ${e}`)
    }
}

app.listen(5000, () => {
    console.log("Server has started on port 5000");
    // dbStart();
})