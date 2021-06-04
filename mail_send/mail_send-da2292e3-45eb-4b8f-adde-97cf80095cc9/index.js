exports.handler = (event, context, callback) => {
    // TODO implement


    const nodemailer = require('nodemailer');
    var AWS = require('aws-sdk');
    
    /*var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'gpstrackervit@gmail.com', 
            pass: 'gpstracker' 
        }
    });*/

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'variablesec@gmail.com',
            pass: 'variable123'
        }
    });
 

// Connect to DynamoDB and fetch the value for ReachedVIT
// If that is Yes - Send this email
// If that is No - Do not send email

    
    var returnresult = "";
    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName:"Multiple_Face_Rekog", Limit: 100
        };
        
    console.log('Hi');
        
    docClient.scan(params, function(err, data) {
        console.log('1');
        if (err) {
            console.log('2');
            callback(err, null);
        } else {
            console.log('3');
            console.log(data);
            //console.log(data.Items[0].ReachedVIT);
            returnresult = data.Items[0].FullName;
            console.log(returnresult);
            
            
            if (returnresult=="Unknown person") {
                console.log("Inside");
    var textEmail = 'Dear Sir/Madam - We notice that some unknown person is waiting outside your house';
    console.log(textEmail);
       
    var mailOptions = {
        from: 'variablesec@gmail.com',
        to: 'sundaranand1998@gmail.com, jaypatel.01@yahoo.com, rohanluthra14@gmail.com, mridhulak99@gmail.com',
        subject: 'Notification: Variable security',
        text: textEmail
    };
    
    console.log('hello');
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, info);
        } else {
            console.log('Email sent: ' + info.response);
            callback(null, 'Email Sent');
        }
    });  
            } else if (returnresult != "No humans detected") {
                if(returnresult == "no match found") {
             var textEmail = 'Dear Sir/Madam - We notice that some unknown person is at your house';
    console.log("Nooo");
                }
                else if(returnresult=="hunter"){
                var textEmail = 'Dear Sir/Madam - We notice that ' + returnresult + ' (criminal) is at your house';
                }
                else {
                    var textEmail = 'Dear Sir/Madam - We notice that ' + returnresult + ' is at your house';
                }
    var mailOptions = {
        from: 'variablesec@gmail.com',
        to: 'sundaranand1998@gmail.com, jaypatel.01@yahoo.com, rohanluthra14@gmail.com, mridhulak99@gmail.com',
        subject: 'Notification: Variable security',
        text: textEmail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, info);
        } else {
            console.log('Email sent: ' + info.response);
            callback(null, 'Email Sent');
        }
    });         
            }
        }
    });
    
    

    
    /*
    var queryExecute = function(callback) {
        docClient.query(params,function(err,result) {
            if(err) {
                callback(err);
                } else {
                console.log(result)
                returnresult = result;
//                items = items.concat(result.Items);
                }
            });
        }
        queryExecute(callback);

    */
    

};