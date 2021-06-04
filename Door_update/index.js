exports.handler = (event, context, callback) => {
    // TODO implement
    // Libraries importing
    //console.log("Starting...");

    // Load the AWS SDK for Node.js
    var AWS = require("aws-sdk");
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var a=0;
    
       
    
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
            console.log(returnresult.Items[0]);
            if(returnresult.Items[0].Door==1){
                a=0;
            }
            else{
                a=1;
            }
            var params = {
                TableName:"Door",
                Item:{
                    "Valid": 1,
                    "Door": a
                    
                }
        
            };
            //console.log("Done with params");
            //console.log("Adding a new item...");
            docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    
        }
    });
    
    
    
    
    
    
};