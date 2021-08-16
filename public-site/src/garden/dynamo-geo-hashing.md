---
title: "Radius-based location search"
---

## DynamoDb Local (via docker)

`docker pull amazon/dynamodb-local`

`docker run -p 8000:8000 amazon/dynamodb-local`

https://medium.com/platform-engineer/running-aws-dynamodb-local-with-docker-compose-6f75850aba1e

```bash
$ > aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": []
}
```

Install packages

```bash
npm i -S aws-sdk dynamodb-geo
```

```bash
npm install -g dynamodb-admin

// For Windows
set DYNAMO_ENDPOINT=http://localhost:8000
dynamodb-admin

// For Mac/Linux
DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin
```

Using QuokkaJS, let's see what we can read via code (not CLI)

Default scheme from example

```json
{
  "TableName": "test-table",

  "ProvisionedThroughput": { "ReadCapacityUnits": 10, "WriteCapacityUnits": 5 },

  "KeySchema": [
    { "KeyType": "HASH", "AttributeName": "hashKey" },

    { "KeyType": "RANGE", "AttributeName": "rangeKey" }
  ],

  "AttributeDefinitions": [
    { "AttributeName": "hashKey", "AttributeType": "N" },

    { "AttributeName": "rangeKey", "AttributeType": "S" },

    { "AttributeName": "geohash", "AttributeType": "N" }
  ],

  "LocalSecondaryIndexes": [
    {
      "IndexName": "geohash-index",

      "KeySchema": [Object],

      "Projection": [Object]
    }
  ]
}
```

Resulting table meta

```json
{
  "AttributeDefinitions": [
    {
      "AttributeName": "hashKey",
      "AttributeType": "N"
    },
    {
      "AttributeName": "rangeKey",
      "AttributeType": "S"
    },
    {
      "AttributeName": "geohash",
      "AttributeType": "N"
    }
  ],
  "TableName": "test-table",
  "KeySchema": [
    {
      "AttributeName": "hashKey",
      "KeyType": "HASH"
    },
    {
      "AttributeName": "rangeKey",
      "KeyType": "RANGE"
    }
  ],
  "TableStatus": "ACTIVE",
  "CreationDateTime": "2021-07-21T20:48:10.440Z",
  "ProvisionedThroughput": {
    "LastIncreaseDateTime": "1970-01-01T00:00:00.000Z",
    "LastDecreaseDateTime": "1970-01-01T00:00:00.000Z",
    "NumberOfDecreasesToday": 0,
    "ReadCapacityUnits": 10,
    "WriteCapacityUnits": 5
  },
  "TableSizeBytes": 0,
  "ItemCount": 0,
  "TableArn": "arn:aws:dynamodb:ddblocal:000000000000:table/test-table",
  "LocalSecondaryIndexes": [
    {
      "IndexName": "geohash-index",
      "KeySchema": [
        {
          "AttributeName": "hashKey",
          "KeyType": "HASH"
        },
        {
          "AttributeName": "geohash",
          "KeyType": "RANGE"
        }
      ],
      "Projection": {
        "ProjectionType": "ALL"
      },
      "IndexSizeBytes": 0,
      "ItemCount": 0,
      "IndexArn": "arn:aws:dynamodb:ddblocal:000000000000:table/test-table/index/geohash-index"
    }
  ]
}
```

Let's load up some data!

Then let's query some data!

Create a reliable local docker-based example for contributions

Can we recreate the table via serverless/cloudformation, instead?

Example of options in serverless (cloudformation) format:

https://gist.github.com/DavidWells/c7df5df9c3e5039ee8c7c888aece2dd5
