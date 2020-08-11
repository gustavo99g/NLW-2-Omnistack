import nodemailer from 'nodemailer'

interface optionsProps {
  to:string,
  subject:string,
  text:string
}

const sendMail = async(options:optionsProps) =>{
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5c448d56859373",
          pass: "e226a8940860a5"
        }
      });

      

      await transport.sendMail({
          from:'proffy@contato.com',
          to:options.to,
          subject:options.subject,
          text:options.text
      })
}


export default sendMail