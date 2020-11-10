---
title: "List dynamo tables and parse with jq"
---

## List Tables in region

I only have a few tables in a region, in an account. 20 of them, to be precise. Listing tables is a paginated operation. For small counts, it won't page. And you can disable pagination with an option to the command.

For my purposes, I got all 20 back. Here's how I ran it:

```bash
aws dynamodb list-tables
```

Here is the output (specific tablenames are redacted, but you can see the format):

```bash
{
    "TableNames": [
        "AFC_BRANCH_AUCTION_ADR_INFO",
        "ApplicationManifest",
        "Approval",
        "Branch",
        "Counters",
        "Document",
        "FP_LEGAL_ENTITIES",
        "GateWayDemo",
        "Report",
        "Test",
        "Test_New",
        "TitleStatusApiKeyNameOrgIdMapTable",
        "UserAuth",
        "UserAuthMigration",
        "Verification",
        "WorkitemLeadTimeToChange",
        "afc-reference",
        "authjson",
        "awsdms_full_load_exceptions",
        "test-bb"
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
  "AFC_BRANCH_AUCTION_ADR_INFO",
  "ApplicationManifest",
  "Approval",
  "Branch",
  "Counters",
  "Document",
  "FP_LEGAL_ENTITIES",
  "GateWayDemo",
  "Report",
  "Test",
  "Test_New",
  "TitleStatusApiKeyNameOrgIdMapTable",
  "UserAuth",
  "UserAuthMigration",
  "Verification",
  "WorkitemLeadTimeToChange",
  "afc-reference",
  "authjson",
  "awsdms_full_load_exceptions",
  "test-bb"
]
```

And ideally I just want the list of items in the array. We can accomplish this by adding square brackets to the jq command:

```bash
aws dynamodb list-tables | jq '.TableNames[]'
```

```bash
"AFC_BRANCH_AUCTION_ADR_INFO"
"ApplicationManifest"
"Approval"
"Branch"
"Counters"
"Document"
"FP_LEGAL_ENTITIES"
"GateWayDemo"
"Report"
"Test"
"Test_New"
"TitleStatusApiKeyNameOrgIdMapTable"
"UserAuth"
"UserAuthMigration"
"Verification"
"WorkitemLeadTimeToChange"
"afc-reference"
"authjson"
"awsdms_full_load_exceptions"
"test-bb"
```
