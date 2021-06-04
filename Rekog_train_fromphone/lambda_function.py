from __future__ import print_function

import boto3
from decimal import Decimal
import json
import urllib

print('Loading function')

dynamodb = boto3.client('dynamodb')
s3 = boto3.client('s3')
rekognition = boto3.client('rekognition')



def index_faces(bucket, key):

    response = rekognition.index_faces(
        Image={"S3Object":
            {"Bucket": bucket,
            "Name": key}},
            CollectionId="family_collection")
    return response
    
def update_index(tableName,faceId, fullName):
    response = dynamodb.put_item(
        TableName=tableName,
        Item={
            'RekognitionId': {'S': faceId},
            'FullName': {'S': fullName}
            }
        ) 


def lambda_handler(event, context):

    
    #bucket = event['Records'][0]['s3']['bucket']['name']
    #key = urllib.unquote_plus(
    #    event['Records'][0]['s3']['object']['key'].encode('utf8'))
    
    bucket = "rekog-imgto3train"
    print("key : ")
    print(event)
    
    key=event['key']
    try:

        
        response = index_faces(bucket, key)
        
    
        
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            faceId = response['FaceRecords'][0]['Face']['FaceId']

            personFullName = event['name']
            #personFullName = "Mridula"
            update_index('family_collection',faceId,personFullName)
            

    
        print(response)

        return response
    except Exception as e:
        print(e)
        print("Error ".format(key, bucket))
        raise e
    