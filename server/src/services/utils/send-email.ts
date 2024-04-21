const nodemailer = require("nodemailer");

const GMAIL_APP_KEY = process.env.GMAIL_APP_KEY as string;
const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS as string;


/**
 * 
 * @param emailParams - email params
 * 
 */
async function sendEmail(emailOptions: any) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_ADDRESS,
      pass: GMAIL_APP_KEY,
    },
  });

  transporter.sendMail(emailOptions, (error: any, info: any) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
  
}

export default sendEmail;
