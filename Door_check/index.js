exports.handler = (event, context, callback) => {
    // TODO implement
    // Libraries importing
    //console.log("Starting...");

    // Load the AWS SDK for Node.js
    var AWS = require("aws-sdk");
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    
    var returnresult = "";
    var params = {
        
        TableName:"Door",
        KeyConditionExpression: "Valid = :valid",
        ExpressionAttributeValues: {
        ':valid': 1
    }
        
    };
        
     //console.log("Just outside scan function");
    //Scaning the entire connected table   
    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Error found - No data found");
            callback(err, null);
        } else {
            
            //console.log(data);
            returnresult = data;
            //console.log("The Returnresult is ");
            //console.log(returnresult);
            callback(null,data);
            
        }
    });
    
    
    
    
    
};