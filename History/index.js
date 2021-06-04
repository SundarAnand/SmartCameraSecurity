exports.handler = (event, context, callback) => {
    // TODO implement
    // Libraries importing
    //console.log("Starting...");

    // Load the AWS SDK for Node.js
    var AWS = require("aws-sdk");
    var docClient = new AWS.DynamoDB.DocumentClient();

    var bucket;
    var key;
    var Fullname;
    var Timestamp;
    var timestamp;
    var Time;
    var time;
    var timefinal;
    var Criminal;
    
    var params = {
        
        TableName:"Multiple_Face_Rekog",
        KeyConditionExpression: "ID = :ID",
        ExpressionAttributeValues: {
        ':ID': "1"
    }
        
    };
    
    docClient.query(params, function(err, data) {
        if (err) {
            console.log("Error found - No data found");
            callback(err, null);
        } else {
            console.log(data);
            //callback(null,data);
            bucket=data.Items[0].bucket;
            key=data.Items[0].key;
            Fullname=data.Items[0].FullName;
            Criminal=data.Items[0].Criminal;
            Timestamp=key.split("/");
            console.log("Timestamp : " + Timestamp);
            timestamp=Timestamp[1].split(".");
            Time=timestamp[0].split("-");
            time=Time[2].split('');
            timefinal=Time[0] + "-" + Time[1] + "-" + time[0] + time[1] + " " + time[2] + time[3] + ":" + time[4] + time[5] + ":" + time[6] + time[7]; 
        }
    });
    
    var returnresult = "";
    params = {
        
        TableName:"History",
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
            console.log("timefinal :" + timefinal);
            var params = {
                TableName:"History",
                Item:{
                    "Valid": 1,
                    "Sno": returnresult.Count+1,
                    "Bucket": bucket,
                    "Key": key,
                    "FullName": Fullname,
                    "Timestamp": timefinal,
                    "Criminal": Criminal
                },
        
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