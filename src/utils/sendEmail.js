const { createTransport } = require("nodemailer")
const { objectConfig } = require("../config")

const { gmail_pass, gmail_user } = objectConfig

const transport = createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: gmail_user,
        pass: gmail_pass 
    }
})

exports.sendEmail = async ({ userMail, subject, html})=>{
    try {
        console.log("Intentando enviar correo a:", userMail)
        const info = await transport.sendMail({
            from: "Email de Prueba <losfresnosfincaysalon@gmail.com>",
            to: userMail,
            subject,
            html
        })
        console.log ( "Email enviado con éxito", info.response)
        
    } catch (error) {
        console.error("error al enviar el correo", error)
    }
}