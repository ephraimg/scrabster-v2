require('dotenv').config();
var nodeMailer = require('nodemailer');

var baseUrl = process.env.NODE_ENV === 'development'
  ? process.env.BASE_URL_DEV
  : process.env.BASE_URL_PROD;

module.exports.mailer = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_ADDRESS,
    pass: process.env.MAILER_PASSWORD
  }
});

module.exports.makeMailerConfig = payload => {
  var recipientName = payload.recipient.user.givenName;
  var recipientEmail = payload.recipient.user.email;
  var play = payload.game.playHistory[payload.game.playHistory.length - 1];
  var playerName = play.player.givenName;
  var gameUrl = `/game/${payload.game.id}`;
  var mailerConfig = {
    from: 'Scrabster Bot <do-not-reply@fakedomain.com>',
    to: recipientEmail,
    subject: 'New play in your Scrabster game',
    html: `
        <div style="">
          <p>
            Hi, ${recipientName}!
          </p>
          <p>
            ${playerName} has made a new play in your Scrabster game.
            To sign in and view the game, <a href="${baseUrl}${gameUrl}">click here</a>.
          </p>
          <hr>
          <p>
            This message was sent automatically from Scrabster.
            To disable further emails, toggle the notifications setting in your game.
          </p>
        </div>
      `
  };
  return mailerConfig;
}