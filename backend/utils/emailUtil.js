import nodemailer from 'nodemailer';
import inputUtil from './inputUtil.js';

const username = inputUtil.username();

export default {
  confirmRegistrationWithEmail: (mail, username, link) => {
    const message = `
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <p>Moi ${
  username
},</p>
          <br>
          <p>You are now a proud member of Match!</p>
          <p>We are sure that you will find the perfect match on Matcha!</p>
          <p>But before you get started, please make sure to validate the following link: <a href="${
  link
}">Click here</a></p>
          <br>
          <p>See you soon on Matcha. The place to be, for desperated people!</p>
        </body>
      </html>`;

    const transporter = nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail',
    });
    transporter.sendMail({
      from: 'team@matcha.com',
      to: mail,
      subject: 'Welcome to Matcha!',
      html: message,
      contentType: 'text/html',
    }),
    (err, info) => {};
  },
};
