const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

function sendEmail(message, sender, receivers) {

    var transporter = nodemailer.createTransport({
        service: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user : "",
            pass : "" 
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };

    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))

    var mailOption = {
        from : "letsfckindoit@gmail.com",
        to: receivers,
        subject : `Letsfuckingdoit Man`,
        template: 'email', // the name of the template file i.e email.handlebars
        context:{
            sender: sender, // replace {{name}} with Adebola
            message: message // replace {{company}} with My Company
        }
        // text : `${message}`
    };

    transporter.sendMail(mailOption, function(error, info){
        if (error){
            console.log(error);
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });

}

module.exports = sendEmail;