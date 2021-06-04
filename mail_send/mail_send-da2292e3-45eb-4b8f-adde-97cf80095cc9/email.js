const http = require('http');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gpstrackervit@gmail.com',
        pass: 'gpstracker'
    }
});

var mailOptions = {
    from: 'gpstrackervit@gmail.com',
    to: 'sundaranand1998@gmail.com',
    subject: 'Alarm: Moving out of Safer Zone',
    text: 'Dear Sir/Madam - We notice that you are going out of Safer Zone. Please come back soon!'
};

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // To send email functionality

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.statusCode = 100;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Error - Unable to send email</h1>\n');
        } else {
            console.log('Email sent: ' + info.response);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Email Sent successfully</h1>\n');
        }
    });


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
