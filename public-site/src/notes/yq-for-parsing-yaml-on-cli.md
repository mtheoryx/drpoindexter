---
title: Use yq to parse yaml on the command line
---

## Parse yaml on the command line with yq

As shown in another note, we can parse JSON on the command line with a tool called `jq`.

But what if you are parsing structured data in yaml? From something like a serverless.yml file, for example?

`yq` is the tool for this.

[You can check this project out here.](https://mikefarah.gitbook.io/yq/)

## Our example serverless yaml file

[Here we will use an example yaml file straight from the serverless site](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

To keep this brief, the full file is displayed way below.

### Problem statement

[Lets start with what we want to do. Let's start with a quickstart from serverless for defining a function to forward calls with Twilio.](https://www.serverless.com/examples/twilio-node-forward-call/)

Out of this file, I would like to list out the actual handler functions for the service, so I can make a checklist of files to go add enhanced telemetry, tracing, error handling, and logging.

How can we do this quickly, regardless how many functions a service is defining? Turns out, pretty easily!

### First step

We will take this file and pipe it to yq. Just to get a gut feel that our yaml file is valid, and that we have yq working.

```bash
cat serverless.yml | yq
```

```json
{
  "service": "your-service",
  "provider": {
    "name": "twilio",
    "config": {
      "accountSid": "${env:TWILIO_ACCOUNT_SID}",
      "authToken": "${env:TWILIO_AUTH_TOKEN}"
    },
    "environment": "${env:TWILIO_RUNTIME_ENV, 'dev'}",
    "environmentVars": {
      "MY_PHONE_NUMBER": "${env:MY_PHONE_NUMBER}"
    }
  },
  "plugins": ["@twilio-labs/serverless-twilio-runtime"],
  "functions": {
    "log-call": {
      "handler": "log-call",
      "path": "/log-call",
      "access": "private"
    },
    "forward-call": {
      "handler": "forward-call",
      "path": "/forward-call",
      "access": "public"
    }
  }
}
```

What is going on here?? Well really, all that yq is doing is converting our yaml to valid json. The commands we use from her on are just `jq` commands. Pretty cool, yeah?

### Reduce the output to the functions

We only really need the functions collection. Let's filter that now.

```bash
cat serverless.yml | yq '.functions[]'
```

```json
{
  "handler": "log-call",
  "path": "/log-call",
  "access": "private"
}
{
  "handler": "forward-call",
  "path": "/forward-call",
  "access": "public"
}
```

### Restrict to just the file names

```bash
cat serverless.yml | yq '.functions[] | {handler}'
```

```json
{
  "handler": "log-call"
}
{
  "handler": "forward-call"
}
```

### Format our list

```bash
cat serverless.yml | yq '.functions[] | {handler} | .[]'
```

```bash
"log-call"
"forward-call"
```

### Output and save this list

Don't worry if this is very arcane looking. I'll have notes about `sed` in other posts. But for now, here is what we are doing as a step-wise operation:

- Read in the `serverless.yml` file
- Pipe this data into the `yq` command
- Parse and filter the data using regular `jq` syntax
- Pipe this to remove the double quotes
- Pipe this to add a `.js` extension
- Pipe this to add back the double quotes
- Pipe this to conditionally add a trailing comma (no comma for last item)

```bash
cat serverless.yml | yq '.functions[] | {handler} | .[]' | sed -e 's/"//g' | sed -e 's/$/.js/' | sed -e 's/\(.*\)/"\1"/' | sed -e '$!s/$/,/'
```

```bash
"log-call.js",
"forward-call.js"
```

## Full example serverless file

```yaml
service: your-service # update this with your service name

provider:
  name: twilio

  # Twilio access credentials (mandatory)
  config:
    accountSid: ${env:TWILIO_ACCOUNT_SID}
    authToken: ${env:TWILIO_AUTH_TOKEN}

  # Twilio runtime supports several domains
  # your functions and assets will be available under
  # -> defaulting to 'dev'
  environment: ${env:TWILIO_RUNTIME_ENV, 'dev'}

  # Environment variables passed to your functions
  # available in the Twilio runtim via `context` parameter
  environmentVars:
    MY_PHONE_NUMBER: ${env:MY_PHONE_NUMBER}

# Twilio runtime has to be added as a plugin
plugins:
  - "@twilio-labs/serverless-twilio-runtime"

functions:
  # Function name
  log-call:
    # Path to the JS handler function in the project (without file extension '.js')
    handler: log-call
    # URL path of the function after deployment
    path: /log-call
    # visibility of the function (can be "public" or "protected")
    access: private
  forward-call:
    # Path to the JS handler function in the project (without file extension '.js')
    handler: forward-call
    # URL path of the function after deployment
    path: /forward-call
    # visibility of the function (can be "public" or "protected")
    access: public
```
