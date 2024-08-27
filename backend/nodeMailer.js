/**
 * Permet d'envoyer un mail de rappel le 5 du mois à 10h
 */

const nodemailer = require("nodemailer");
const cron = require("node-cron");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: { ciphers: "SSLv3" },
  auth: {
    user: "sebastienlotten@hotmail.fr",
    pass: "0y1wAAT?x.qjmsy@c(MMd=NNh5md$A",
  },
});

const mailOptions = {
  from: "sebastienlotten@hotmail.fr",
  to: "lottensebastien@gmail.com",
  subject: "Rappel C.A faire",
  text: "N'oubliez pas d'enregistrer votre chiffre d'affaire de ce mois, afin de suivre la progression de votre salon! Cet e-mail est un e-mail automatique merci de ne pas y répondre",
};
/**
 * Configuration du jour et de l'heure d'envoi du mail
 */
cron.schedule("0 10 5 * *", () => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("e-mail envoyé" + info.response);
    }
  });
});
