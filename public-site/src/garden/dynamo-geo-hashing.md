---
title: "Radius-based location search"
---

### My Actual Code Example

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

Wait, something's wrong... if we pop the new repo open and find the help for "push an existing repo" we notice that github made the primary branch `main`

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

### TODO:

Create a reliable local Docker-based example for contributions

So we want to make this whole solution easy to build locally, test out, and contribute back? We sure do! Let's use Docker!

Here's what we need:

- The docker container running Dynamo Local instance
- We want to set up the UI for this
- We would want to pre-load some data
- We want all this setup and tear down to be effortless

Let's get the local dynamo instance going first. Create a `docker-compose.yml` file with the following:

Then let's query some data!

Create a reliable local docker-based example for contributions

Can we recreate the table via serverless/cloudformation, instead?

Example of options in serverless (cloudformation) format:

https://gist.github.com/DavidWells/c7df5df9c3e5039ee8c7c888aece2dd5
