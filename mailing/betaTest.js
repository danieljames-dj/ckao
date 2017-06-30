var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "ckao"
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Keralaspeedcubing@gmail.com',
    pass: 'aaaaa'
  }
});

var mailOptions = {
  from: 'Keralaspeedcubing@gmail.com',
  to: 'djdany444@gmail.com',
  subject: 'Welcome to Cubing Kerala Beta Testing Group',
  text: 'test'
};


con.query(`select * from parts`, function(err, rows) {
    for (var i = 0; i < rows.length; i++) {
        mailOptions.to = rows[i].Email;
        mailOptions.text = "Hi " + rows[i].Name + ",\nHow are you? This is just a test email..";
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    }
});