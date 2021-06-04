exports.handler = (event, context, callback) => {
    // TODO implement
    // Libraries importing
    console.log("Starting...");

    var AWS = require('aws-sdk');
    
    console.log("AWS SDK Onboarded");
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    console.log("Going to connecet DynamoDB");
    var params = {
        TableName:"Multiple_Face_Rekog",
        KeyConditionExpression: "ID = :ID",
        ExpressionAttributeValues: {
        ':ID': "1"
        },
    };
     console.log("Just outside scan function");
    //Scaning the entire connected table   
    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Error found - No data found");
            callback(err, null);
        } else {
            console.log(data);
            callback(null,data);
        }
    });
};
