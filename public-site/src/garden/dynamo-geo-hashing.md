---
title: "Radius-based location search with DynamoDB"
status: "featured"
---

### My Final Code Example

I have shared the final result of the proof of concept on github if you just want to peruse the finished result. Leave some issues there if you run into problems, or have ideas for enhancements!

[DynamoDB GeoSearch on GitHub](https://github.com/mtheoryx/dynamo-geosearch)

### Starting from scratch

Create a new repo in github

My usual method of git init

```bash
$ > git init
Initialized empty Git repository in /Users/drpoindexter/code/contrib/dynamo-geosearch/.git/
```

We add a couple of files, add them, and commit them locally

```bash
$ > ls -la

total 8
drwxr-xr-x   6 drpoindexter  staff   192 Aug 16 19:27 .
drwxr-xr-x  32 drpoindexter  staff  1024 Aug 16 19:23 ..
drwxr-xr-x  13 drpoindexter  staff   416 Aug 16 19:29 .git
-rw-r--r--   1 drpoindexter  staff  3037 Aug 16 19:28 .gitignore
drwxr-xr-x   3 drpoindexter  staff    96 Aug 16 19:23 .vscode
-rw-r--r--   1 drpoindexter  staff     0 Aug 16 19:27 README.md
```

Then we can use `hub` to create a private repo, for now

```bash
$ > hub create -p
Updating origin
https://github.com/mtheoryx/dynamo-geosearch
```

Wait, something's wrong... if we pop the new repo open and find the help for "push an existing repo" we notice that github made the primary branch `main` (which is great!)

```bash
$ > git remote add origin git@github.com:mtheoryx/dynamo-geosearch.git
$ > git branch -M main
$ > git push -u origin main
```

But a local git init still made this `master` (can we override this by default? To explore later)

```bash
$ > git branch -a
* master
```

No worries, this is fixable locally before we do the push to remote. First, let's make a new branch named main and switch to it, and then just delete the master branch.

_Note, you can chain operations in bash/zsh/etc in this way_

```bash
$ > git checkout -b main && git branch -D master
Switched to a new branch 'main'
Deleted branch master (was 55ef951).
```

Great! now let's follow the advice from the hub of git to connect this thing up and get a reliable remote.

Success looks like this:

```bash
$ > git branch -a
* main
  remotes/origin/main
```

So I've heard about this DynamoDB Local thing, and I can use Docker for it. So let's try this out.

On DockerHub we can see that this image is available. Let's follow their guidelines to at least pull the built image and try to run it. What could go wrong?

Pull and Run the Image

```bash
$ > docker pull amazon/dynamodb-local
Using default tag: latest
latest: Pulling from amazon/dynamodb-local
Digest: sha256:bdd26570dc0e0ae49e1ea9d49ff662a6a1afe9121dd25793dc40d02802e7e806
Status: Image is up to date for amazon/dynamodb-local:latest
docker.io/amazon/dynamodb-local:latest

$ > docker run -p 8000:8000 amazon/dynamodb-local
Initializing DynamoDB Local with the following configuration:
Port:	8000
InMemory:	true
DbPath:	null
SharedDb:	false
shouldDelayTransientStatuses:	false
CorsParams:	*
```

We should have something running, so let's open a new terminal and check

```bash
$ > docker ps
CONTAINER ID   IMAGE                   COMMAND                  CREATED              STATUS              PORTS                                       NAMES
1ea951165056   amazon/dynamodb-local   "java -jar DynamoDBL…"   About a minute ago   Up About a minute   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp   suspicious_wiles
~ >
```

Great, so we have pulled a provider image, and created a container from it and run the container. Perfect! For now, let's just go back to the first terminal session and kill it. We need to set up a few things.

First off... AWS is Security Centric. So even though this is decidedly NOT a dynamo instance in the AWS cloud, the restrictions are there even on your local machine. So we will need to create a folder and file for your AWS credentials.

Not ready to buy into AWS? No worries, this next step is free of charge, and exposes nothing if you do it this way.

We're going to create some dummy default credentials. If you already have established credentials, config, etc, I'll write a bit more about how I do my own workaround upon request.

A region definition is required for this, keep that in mind!

Create the config file, populate it, and test it out

```bash
$ > cat ~/.aws/credentials

[default]
aws_access_key_id = JUSTSOMEKEYID
aws_secret_access_key = JUSTASECRETKEY
region = us-east-2
```

Reload your shell or open a new terminal (if those words make no sense, let me know, I'll make a post about how to reload your shell!). Now let's try to issue a command against our local dynamo db, just a list table command

```bash
$ > aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": []
}
```

https://medium.com/platform-engineer/running-aws-dynamodb-local-with-docker-compose-6f75850aba1e

Once you have your aws config set up, you can issue this command against the container.

```bash
$ > aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": []
}
```

If you see the above output, switch back to that tab/session, and kill the container. This is ctrl-c, or whatever process interrupt your OS supports.

Once we've gotten this far, we know we have a local dynamo instance that can work. So we now need to convert this manual pull/run issue into something repeatable for someone else. For this, we can reach to Docker Compose, and the `docker-compose.yml` file. For now, it will look like this to replicate what we have out of the box:

```yml
version: "3.8"

services:
  dynamodb-local:
  image: "amazon/dynamodb-local:latest"
  container_name: dynamodb-local
  ports:
    - "8000:8000"
  working_dir: /home/dynamodblocal
  command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."
```

Check that we can run this per the compose config

```bash
$ > docker-compose up
Creating network "dynamo-geosearch_default" with the default driver
Creating dynamodb-local ... done
Attaching to dynamodb-local
dynamodb-local    | Initializing DynamoDB Local with the following configuration:
dynamodb-local    | Port:       8000
dynamodb-local    | InMemory:   false
dynamodb-local    | DbPath:     .
dynamodb-local    | SharedDb:   true
dynamodb-local    | shouldDelayTransientStatuses:       false
dynamodb-local    | CorsParams: *
dynamodb-local    |
```

In a different terminal, issue the same list tables operation and notice no difference. It's the same container definition (image) run with the same default configuration, except this time, it's via code. Code can be changed and version-controlled; this is ideal.

```bash
$ > aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": []
}
```

Our next step is to get the Dynamodb Admin container running. This will provide a running web interface to inspect our running instance.

Install required packages:

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

### Reliable docker setup

So we want to make this whole solution easy to build locally, test out, and contribute back? We sure do! Let's use Docker!

Here's what we need:

- The docker container running Dynamo Local instance
- We want to set up the UI for interacting with the container
- We would want to pre-load some data (sidecar pattern)
- We want all this setup and tear down to be effortless

#### Dynamodb Docker Container

Let's get the local dynamo instance going first. Create a `docker-compose.yml` file with the following:

```yml
version: "3.8"

services:
  dynamodb-local:
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."
```

The above definition in will start a local instance of DynamoDB.

We will also add a file that tells Docker Compose to ignore certain files when copying contents over to the container.

Create a `.dockerignore` file with the following contents

```txt
node_modules
.git
npm-debug
.aws
```

To bring the service up:

`docker-compose up -d`

To stop the service:

`docker-compose down`

The service will be running on `localhost:8000`.

### Create a UI for the dynamodb local service

The dynamodb container also runs a web interface. We can use the `dynamodb-admin` package to interact with it.

Init the project: `npm init`

Now install some dependencies

```bash
$ > npm i -S dynamodb-admin
```

We'll add a script entry in `package.json` for starting the UI, which also passes in the dynamo endpoint:

```json
{
  "name": "dynamo-geosearch",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "dynamodb-admin": "^4.0.3"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start:ui": "DYNAMO_ENDPOINT=http://dynamodb-local:8000 dynamodb-admin"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mtheoryx/dynamo-geosearch.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/mtheoryx/dynamo-geosearch/issues"
  },
  "homepage": "https://github.com/mtheoryx/dynamo-geosearch#readme"
}
```

Augment the `docker-compose.yml` file with a new service, just for this web ui:

```yml
version: "3.8"

services:
  dynamodb-local:
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."
  dynamo-ui:
    build: .
    image: dynamo-ui
    container_name: dynamo-ui
    ports:
      - "8001:8001"
    depends_on:
      - dynamodb-local
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
```

And add this to a file named `Dockerfile`

```Dockerfile
FROM node:14

# Set up Workspace
WORKDIR /usr/app

# Install app dependencies
COPY ./package*.json ./
RUN npm install --quiet

# Copy app source
COPY . .

# Expose ports
EXPOSE 8001

# Default Command
CMD ["npm", "run", "start:ui"]
```

Starting the stack should result in 2 services running. One for the dynamodb local instance (on port 8000), and a second for the web ui (on port 8001).

```bash
$> docker-compose up -d
```

Viewing the web UI will reveal we have no tables or data. We should tackle this next.

### Load sample data via a side-car pattern

A side-car pattern is a pattern that allows us to load data into a service, and then that container/service can end or exit without concern. For this we will add another service, a data loading script.

For our data loading, we will need 2 new dependencies. The `aws-sdk` and `dynamodb-geo` packages. The former will allow communicating with our local dynamo instance, and the latter will allow us to interact with the geospatial index.

```bash
$ > npm i -S aws-sdk dynamodb-geo
```

Add a new service to the `docker-compose.yml` file:

```yml
version: "3.8"

services:
  dynamodb-local:
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."
  dynamo-ui:
    build: .
    image: dynamo-ui
    container_name: dynamo-ui
    ports:
      - "8001:8001"
    depends_on:
      - dynamodb-local
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
  data-loader:
    build: .
    image: data-loader
    container_name: data-loader
    command: "node ./loader.js"
    depends_on:
      - dynamodb-local
      - dynamo-ui
    environment:
      AWS_ACCESS_KEY_ID: "dummy"
      AWS_SECRET_ACCESS_KEY: "dummy"
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
```

I would like to point out an interesting value in the service definition for the loader service:

```yml
environment:
  AWS_ACCESS_KEY_ID: "dummy"
  AWS_SECRET_ACCESS_KEY: "dummy"
```

I would wonder, why on earth is this needed, especially when those values are very clearly unimportant. Because the data loader is using the `aws-sdk` package, there must be two environment variables set. The actual value is unimportant since this is local work only, but the SDK does not know this, and will block the request.

An alternative is to use an environment file. Or pull secrets from some other source such as AWS Parameter Store or AWS Secrets Manager. But for this local work, it's unimportant, the variables just need to exist in the environment.

And the contents of our `loader.js` file:

```js
const AWS = require("aws-sdk")
const uuid = require("uuid")
const ddb = new AWS.DynamoDB({
  endpoint: "http://dynamodb-local:8000",
  region: "us-east-2",
})
const ddbGeo = require("dynamodb-geo")
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, "test-table")

config.hashKeyLength = 6

const capitalsManager = new ddbGeo.GeoDataManager(config)

const createTableInput = ddbGeo.GeoTableUtil.getCreateTableRequest(config)

console.log("Creating table with schema:")
console.dir(createTableInput, { depth: null })

// Create the table
ddb
  .createTable(createTableInput)
  .promise()
  .then(function () {
    return ddb.waitFor("tableExists", { TableName: config.tableName }).promise()
  })
  // Load sample data in batches
  .then(function () {
    console.log("Loading sample data from capitals.json")
    const data = require("./capitals.json")
    const putPointInputs = data.map(function (capital) {
      return {
        RangeKeyValue: { S: uuid.v4() }, // Use this to ensure uniqueness of the hash/range pairs.
        GeoPoint: {
          latitude: capital.latitude,
          longitude: capital.longitude,
        },
        PutItemInput: {
          Item: {
            country: { S: capital.country },
            capital: { S: capital.capital },
          },
        },
      }
    })

    const BATCH_SIZE = 25
    const WAIT_BETWEEN_BATCHES_MS = 1000
    var currentBatch = 1

    function resumeWriting() {
      if (putPointInputs.length === 0) {
        return Promise.resolve()
      }
      const thisBatch = []
      for (
        var i = 0, itemToAdd = null;
        i < BATCH_SIZE && (itemToAdd = putPointInputs.shift());
        i++
      ) {
        thisBatch.push(itemToAdd)
      }
      console.log(
        "Writing batch " +
          currentBatch++ +
          "/" +
          Math.ceil(data.length / BATCH_SIZE)
      )
      return capitalsManager
        .batchWritePoints(thisBatch)
        .promise()
        .then(function () {
          return new Promise(function (resolve) {
            setInterval(resolve, WAIT_BETWEEN_BATCHES_MS)
          })
        })
        .then(function () {
          return resumeWriting()
        })
    }

    return resumeWriting().catch(function (error) {
      console.warn(error)
    })
  })
  .catch(console.warn)
  .then(function () {
    process.exit(0)
  })
```

We will need some data to load for this script to work. I use an example world capitals data set from the example I found. The contents of the `capitals.json` file:

```json
[
  {
    "country": "Albania",
    "capital": "Tirana",
    "latitude": 41.33,
    "longitude": 19.82
  },
  {
    "country": "Andorra",
    "capital": "Andorra la Vella",
    "latitude": 42.51,
    "longitude": 1.52
  },
  {
    "country": "Austria",
    "capital": "Vienna",
    "latitude": 48.21,
    "longitude": 16.37
  },
  {
    "country": "Belarus",
    "capital": "Minsk",
    "latitude": 53.9,
    "longitude": 27.57
  },
  {
    "country": "Belgium",
    "capital": "Brussels",
    "latitude": 50.85,
    "longitude": 4.35
  },
  {
    "country": "Bosnia and Herzegovina",
    "capital": "Sarajevo",
    "latitude": 43.85,
    "longitude": 18.36
  },
  {
    "country": "Bulgaria",
    "capital": "Sofia",
    "latitude": 42.7,
    "longitude": 23.32
  },
  {
    "country": "Croatia",
    "capital": "Zagreb",
    "latitude": 45.81,
    "longitude": 15.98
  },
  {
    "country": "Cyprus",
    "capital": "Nicosia",
    "latitude": 35.17,
    "longitude": 33.37
  },
  {
    "country": "Czech Republic",
    "capital": "Prague",
    "latitude": 50.09,
    "longitude": 14.42
  },
  {
    "country": "Denmark",
    "capital": "Copenhagen",
    "latitude": 55.68,
    "longitude": 12.57
  },
  {
    "country": "Estonia",
    "capital": "Tallinn",
    "latitude": 59.44,
    "longitude": 24.75
  },
  {
    "country": "Faroe Islands",
    "capital": "Tórshavn",
    "latitude": 62.01,
    "longitude": -6.77
  },
  {
    "country": "Finland",
    "capital": "Helsinki",
    "latitude": 60.17,
    "longitude": 24.94
  },
  {
    "country": "France",
    "capital": "Paris",
    "latitude": 48.85,
    "longitude": 2.35
  },
  {
    "country": "Germany",
    "capital": "Berlin",
    "latitude": 52.52,
    "longitude": 13.41
  },
  {
    "country": "Gibraltar",
    "capital": "Gibraltar",
    "latitude": 36.14,
    "longitude": -5.35
  },
  {
    "country": "Greece",
    "capital": "Athens",
    "latitude": 37.98,
    "longitude": 23.72
  },
  {
    "country": "Guernsey",
    "capital": "St Peter Port",
    "latitude": 49.46,
    "longitude": -2.54
  },
  {
    "country": "Hungary",
    "capital": "Budapest",
    "latitude": 47.5,
    "longitude": 19.04
  },
  {
    "country": "Iceland",
    "capital": "Reykjavík",
    "latitude": 64.14,
    "longitude": -21.9
  },
  {
    "country": "Ireland",
    "capital": "Dublin",
    "latitude": 53.33,
    "longitude": -6.25
  },
  {
    "country": "Isle of Man",
    "capital": "Douglas",
    "latitude": 54.15,
    "longitude": -4.48
  },
  {
    "country": "Italy",
    "capital": "Rome",
    "latitude": 41.89,
    "longitude": 12.48
  },
  {
    "country": "Jersey",
    "capital": "Saint Helier",
    "latitude": 49.19,
    "longitude": -2.1
  },
  {
    "country": "Kosovo",
    "capital": "Pristina",
    "latitude": 42.67,
    "longitude": 21.17
  },
  {
    "country": "Latvia",
    "capital": "Riga",
    "latitude": 56.95,
    "longitude": 24.11
  },
  {
    "country": "Liechtenstein",
    "capital": "Vaduz",
    "latitude": 47.14,
    "longitude": 9.52
  },
  {
    "country": "Lithuania",
    "capital": "Vilnius",
    "latitude": 54.69,
    "longitude": 25.28
  },
  {
    "country": "Luxembourg",
    "capital": "Luxembourg",
    "latitude": 49.61,
    "longitude": 6.13
  },
  {
    "country": "Macedonia",
    "capital": "Skopje",
    "latitude": 42,
    "longitude": 21.43
  },
  {
    "country": "Malta",
    "capital": "Valletta",
    "latitude": 35.9,
    "longitude": 14.51
  },
  {
    "country": "Moldova",
    "capital": "Chişinău",
    "latitude": 47.01,
    "longitude": 28.86
  },
  {
    "country": "Monaco",
    "capital": "Monaco",
    "latitude": 43.73,
    "longitude": 7.42
  },
  {
    "country": "Montenegro",
    "capital": "Podgorica",
    "latitude": 42.44,
    "longitude": 19.26
  },
  {
    "country": "Netherlands",
    "capital": "Amsterdam",
    "latitude": 52.37,
    "longitude": 4.89
  },
  {
    "country": "Norway",
    "capital": "Oslo",
    "latitude": 59.91,
    "longitude": 10.75
  },
  {
    "country": "Poland",
    "capital": "Warsaw",
    "latitude": 52.23,
    "longitude": 21.01
  },
  {
    "country": "Portugal",
    "capital": "Lisbon",
    "latitude": 38.72,
    "longitude": -9.13
  },
  {
    "country": "Romania",
    "capital": "Bucharest",
    "latitude": 44.43,
    "longitude": 26.11
  },
  {
    "country": "Russia",
    "capital": "Moscow",
    "latitude": 55.75,
    "longitude": 37.62
  },
  {
    "country": "San Marino",
    "capital": "San Marino",
    "latitude": 43.94,
    "longitude": 12.45
  },
  {
    "country": "Serbia",
    "capital": "Belgrade",
    "latitude": 44.8,
    "longitude": 20.47
  },
  {
    "country": "Slovakia",
    "capital": "Bratislava",
    "latitude": 48.15,
    "longitude": 17.11
  },
  {
    "country": "Slovenia",
    "capital": "Ljubljana",
    "latitude": 46.05,
    "longitude": 14.51
  },
  {
    "country": "Spain",
    "capital": "Madrid",
    "latitude": 40.42,
    "longitude": -3.7
  },
  {
    "country": "Svalbard and Jan Mayen",
    "capital": "Longyearbyen",
    "latitude": 78.22,
    "longitude": 15.64
  },
  {
    "country": "Sweden",
    "capital": "Stockholm",
    "latitude": 59.33,
    "longitude": 18.06
  },
  {
    "country": "Switzerland",
    "capital": "Berne",
    "latitude": 46.95,
    "longitude": 7.45
  },
  {
    "country": "Ukraine",
    "capital": "Kiev",
    "latitude": 50.45,
    "longitude": 30.52
  },
  {
    "country": "United Kingdom",
    "capital": "London",
    "latitude": 51.51,
    "longitude": -0.13
  },
  {
    "country": "Vatican",
    "capital": "Vatican",
    "latitude": 41.9,
    "longitude": 12.45
  }
]
```

Since we do still have our dynamo admin UI running, we can use it to view the table contents and verify the data has been loaded.

### Query data in DynamoDb local container via SDK

Now that we have a loading container, that is populating a local dynamo instance, we can query the data. We'll create yet another service to query the data.

Add the query service to the Docker Compose stack. Note, this will also need those fake AWS credentials since we will be using the AWS SDK for the query. We can re-use the `Dockerfile` from the data loader service, since we can provide a command to override the default, and all we have built is a very basic NodeJS container.

We will also be using those same 2 packages that already have been installed and written to our `package.json` file (`aws-sdk` and `dynamodb-geo`).

```yml
version: "3.8"

services:
  dynamodb-local:
    image: "amazon/dynamodb-local:latest"
    container_name: dynamodb-local
    ports:
      - "8000:8000"
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ."
  dynamo-ui:
    build: .
    image: dynamo-ui
    container_name: dynamo-ui
    ports:
      - "8001:8001"
    depends_on:
      - dynamodb-local
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
  data-loader:
    build: .
    image: data-loader
    container_name: data-loader
    command: "node ./loader.js"
    depends_on:
      - dynamodb-local
      - dynamo-ui
    environment:
      AWS_ACCESS_KEY_ID: "dummy"
      AWS_SECRET_ACCESS_KEY: "dummy"
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
  dynamo-query:
    build: .
    image: dynamo-query
    container_name: dynamo-query
    command: "node ./query.js"
    depends_on:
      - dynamodb-local
      - data-loader
      - dynamo-ui
    environment:
      AWS_ACCESS_KEY_ID: "dummy"
      AWS_SECRET_ACCESS_KEY: "dummy"
    volumes:
      - ./:/usr/app
      - /usr/app/node_modules
```

And the contents of our `query.js` file:

```js
const AWS = require("aws-sdk")
const uuid = require("uuid")
const ddb = new AWS.DynamoDB({
  endpoint: "http://dynamodb-local:8000",
  region: "us-east-2",
})
const ddbGeo = require("dynamodb-geo")
const config = new ddbGeo.GeoDataManagerConfiguration(ddb, "test-table")

config.hashKeyLength = 6

const capitalsManager = new ddbGeo.GeoDataManager(config)

console.log("Querying an existing table")

capitalsManager
  .queryRadius({
    RadiusInMeter: 100000,
    CenterPoint: {
      latitude: 52.22573,
      longitude: 0.149593,
    },
  })
  .then(function (result) {
    return capitalsManager
      .queryRadius({
        RadiusInMeter: 100000,
        CenterPoint: {
          latitude: 52.22573,
          longitude: 0.149593,
        },
      })
      .then(function (result) {
        console.log(result)
      })
      .catch(function (err) {
        console.log(err)
      })
  })
  .catch(function (err) {
    console.log(err)
  })
```

With all these things in place, we will bring the whole stack down, and then back up again. Our desired output would be seeing the services come up, the loader runs, and finally the query service is able to select one of the capitals from the table.

```bash
docker-compose down
docker-compose up --build
```

Example expected output

```bash
dynamo-query      | [
dynamo-query      |   {
dynamo-query      |     rangeKey: { S: '3d462de8-5472-41bf-9509-4c871c7b3808' },
dynamo-query      |     country: { S: 'United Kingdom' },
dynamo-query      |     capital: { S: 'London' },
dynamo-query      |     hashKey: { N: '522136' },
dynamo-query      |     geoJson: { S: '{"type":"POINT","coordinates":[-0.13,51.51]}' },
dynamo-query      |     geohash: { N: '5221366118452580119' }
dynamo-query      |   }
dynamo-query      | ]
```

### Summary

Now that we have shown how to do this locally, it allows for experimentation. Try some different data sets. Some data transformations. Maybe a frontend application that allows inputing a location, and desired geographic radius, and experimenting with result sets, data transformation for the client, and even a map-based visualizer of the locations and results.

Have fun with it, the worst you can do is have to bring down the whole stack and try it all again!

### Possibly TODO:

Can we recreate the table via serverless/cloudformation, instead?

Example of options in serverless (cloudformation) format:

https://gist.github.com/DavidWells/c7df5df9c3e5039ee8c7c888aece2dd5
