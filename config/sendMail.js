const nodemailer = require("nodemailer");

const sendMail = (userEmail, code) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "luskbonnie@outlook.com",
      pass: "Dr.Merge2331",
    },
  });

  const options = {
    from: "luskbonnie@outlook.com",
    to: userEmail.toString(),
    subject: "Sending email with Node.js",
    html: code.toString(),
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("sent" + info.response);
  });
};

module.exports = sendMail;
