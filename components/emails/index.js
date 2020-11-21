let nodemailer = require('nodemailer');
let visitas = require('../visitas/visitasModels');
require("dotenv").config();

myEmail = process.env.MY_EMAIL;

//configuracion del server
let transport = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.USERNAME_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

//Envio de email
const enviarEmail = async (id) => {
    const visita = await visitas.visitasById(id);

    let message = {
        from : myEmail,
        to : visita.visitas.email,
        subject: 'FORMULARIO DE VISITA CPA - Control y Proteccion Ambiental',
        text : 'Enviado su formulario de visita',
        attachments: [{
                path: '../public/pdfs/formulario-'+id+'.pdf'
        }]
    }

    transporter.verify(function(error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });

    transport.sendMail(message, function(err){
        if(err){
            console.log('Failed message');
            console.log(err);
            return;
        }

        console.log('Email Sent.\n');
    });

}

module.exports = {
    enviarEmail
}



