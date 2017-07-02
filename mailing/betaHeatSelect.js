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
    pass: 'aaaa'
  }
});

var mailOptions = {
  from: 'Keralaspeedcubing@gmail.com',
  to: 'djdany444@gmail.com',
  subject: 'Cubing Kerala Alappey Competition - Select your Time Slot Test',
  text: 'test'
};

var i = 0;
rows = [{}];



// transporter.sendMail(mailOptions, function(error, info){
// if (error) {
//     console.log(error);
// } else {
//     console.log('Email sent: ' + info.response);
// }
// });


con.query(`select * from parts`, function(err, rows) {
    for (var i = 0; i < rows.length; i++) {
        mailOptions.to = rows[i].Email;
        mailOptions.html = `
<p>Hi ` + rows[i].Name + `,</p>
<p>
Greetings from Cubing Kerala Team. We have updated our new schedule. <a href="https://www.worldcubeassociation.org/competitions/CubingKeralaAlappeyOpen2017#1536-schedule">Click here</a> to view the schedule.
</p>
For some events, there are more than one slot for round 1 and each participant will be participating in any one of the slot. We will assign you to any one of the slot and inform you on July 5, 2017. There is also an option to select a slot of your choice. If you want to select, you have to do it before July 4, 2017 23:59 HRS IST by <a href="http://localhost:8080/index.html?id=` + rows[i].WCAID + `&passcode=` + rows[i].passcode + `">clicking here</a>.
<p>
    Feel free to reply us for any clarifications on the same.
</p>
<p>
    Regards,<br/>Cubing Kerala Team (Automatic mail)
</p>
`
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    }
});