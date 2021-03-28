---
title: "List dynamo tables and parse with jq"
---

[If you're starting with an input of YAML, here's how you can parse that as well](/garden/yq-for-parsing-yaml-on-cli)

## List Tables in region

I only have a few tables in a region, in an account. 20 of them, to be precise. Listing tables is a paginated operation. For small counts, it won't page. And you can disable pagination with an option to the command.

For my purposes, I got all 20 back. Here's how I ran it:

```bash
aws dynamodb list-tables
```

Here is the output (specific table names are redacted, but you can see the format):

```bash
{
    "TableNames": [
      "Table1",
      "Table2",
      "Table3",
      "Table4",
      "Table5",
      "Table6",
      "Table7",
      "Table8",
      "Table9",
      "Table10",
      "Table11",
      "Table12",
      "Table13",
      "Table14",
      "Table15",
      "Table16",
      "Table17",
      "Table18",
      "Table19",
      "Table20"
    ]
}
```

## Parse with Jq

What is jq? It's a command line json processor. [You can learn more about it here](https://stedolan.github.io/jq/).

What I'm really after is just the list of table names, for further operation. To do this we need to "dive into" the json response. Let's get just that array in the `TableNames` property:

```bash
aws dynamodb list-tables | jq '.TableNames'
```

This now gives us just the array:

```bash
[
  "Table1",
  "Table2",
  "Table3",
  "Table4",
  "Table5",
  "Table6",
  "Table7",
  "Table8",
  "Table9",
  "Table10",
  "Table11",
  "Table12",
  "Table13",
  "Table14",
  "Table15",
  "Table16",
  "Table17",
  "Table18",
  "Table19",
  "Table20"
]
```

And ideally I just want the list of items in the array. We can accomplish this by adding square brackets to the jq command:

```bash
aws dynamodb list-tables | jq '.TableNames[]'
```

```bash
"Table1"
"Table2"
"Table3"
"Table4"
"Table5"
"Table6"
"Table7"
"Table8"
"Table9"
"Table10"
"Table11"
"Table12"
"Table13"
"Table14"
"Table15"
"Table16"
"Table17"
"Table18"
"Table19"
"Table20"
```
