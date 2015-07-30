// server/smtp.js
Meteor.startup(function () {
    //set this properly if you want to actually send e-mails
    //if you ever 'meteor deploy' this is not necessary. Mailgun will do it for you
    smtp = {
        username: 'gogreen.chris@gmail.com',   // eg: server@gentlenode.com
        password: '',   // eg: 3eeP1gtizk5eziohfervU
        server:   'smtp.gmail.com',  // eg: mail.gandi.net
        port: 25
    }

    //process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
