---
title: "How to clone or copy public S3 Data into your own bucket"
---

## Why did I do this

I developed a solution on AWS for a client that leveraged a very cool feature of Amazon S3 called `Amazon S3 Select`. I was asked to be a guest on a new AWS Youtube series called "Do Hard Things" highlighting why and how I came up with it.

I'm a professional, so this means, I can't really show the EXACT solution, the EXACT code or the data involved. That's a no-no for NDA, privacy, etc. I'm sure you'll understand.

So then what do I do?

Well, turns out there's a bunch of publicly available S3 buckets of really awesome data. Go take a look here for some ideas!

[AWS Registry of Open Data on AWS](https://registry.opendata.aws/)

## What data am I working with

What I intended to do was show how Amazon S3 Select is a great choice for easily slicing down very large data sets. Well I found one that was sufficiently broad, large in size, and public.

The [New York City Taxi and Limousine Commission (TLC) Trip Record Data](https://registry.opendata.aws/nyc-tlc-trip-records-pds/)

Next step was... where is this bucket, and how do I get it into MY bucket, for experimentation.

Well right from that page we can see the Amazon S3 bucket ARN `aws s3 ls s3://nyc-tlc/ --no-sign-request`

So let's take a look at what is in there, first! You'll notice there is an argument to that command `--no-sign-request`. This means you don't even need an AWS account, or credentials, or local config or anything just to poke around.

Here's a bit of what we get:

```bash
$ aws s3 ls s3://nyc-tlc/ --no-sign-request
->                           PRE misc/
->                           PRE trip data/
```

This can be a little bewildering work with, especially in an unknown bucket. I've experimented and know that what we want is in a "folder" of "trip data", and we'd want something a bit more readable as we continue poking at the data. I've taken the liberty to truncate a whole bunch.

```bash
aws s3 ls s3://nyc-tlc/trip\ data/ --no-sign-request --human-readable
2016-08-11 10:16:22    0 Bytes
2016-08-11 10:32:21   81.8 MiB fhv_tripdata_2015-01.csv
...
2019-03-18 10:06:26    1.3 GiB fhv_tripdata_2018-02.csv
...
2020-07-29 14:35:25  454.6 MiB fhvhv_tripdata_2020-06.csv
2021-02-26 10:53:54  599.3 MiB fhvhv_tripdata_2020-07.csv
...
2016-08-15 15:09:57  203.6 MiB green_tripdata_2014-09.csv
2016-08-15 15:10:49  222.9 MiB green_tripdata_2014-10.csv
2016-08-15 15:11:56  231.4 MiB green_tripdata_2014-11.csv
2016-08-15 15:13:08  245.9 MiB green_tripdata_2014-12.csv
2016-08-15 15:31:36  232.0 MiB green_tripdata_2015-01.csv
...
2016-08-15 09:14:35    2.4 GiB yellow_tripdata_2011-02.csv
2016-08-15 09:27:29    2.7 GiB yellow_tripdata_2011-03.csv
...
2016-08-16 11:34:19    1.7 GiB yellow_tripdata_2015-11.csv
2016-08-16 11:40:29    1.7 GiB yellow_tripdata_2015-12.csv
2016-08-11 14:37:11    1.6 GiB yellow_tripdata_2016-01.csv
2016-08-11 15:32:23    1.7 GiB yellow_tripdata_2016-02.csv
2016-08-11 14:47:25    1.8 GiB yellow_tripdata_2016-03.csv
...
2018-02-20 12:42:07  781.2 MiB yellow_tripdata_2017-11.csv
2018-02-20 12:47:09  799.3 MiB yellow_tripdata_2017-12.csv
2018-08-03 15:13:06  736.3 MiB yellow_tripdata_2018-01.csv
2018-08-03 15:15:27  714.1 MiB yellow_tripdata_2018-02.csv
...
2021-02-26 11:54:00  128.3 MiB yellow_tripdata_2020-12.csv
```

Now we're getting somewhere! So we see it's in CSV format, and can deduce... it's not compressed at all. This is gonna be pretty big. I'm gonna zero in on just the yellow cab data, specifically. Let's use some just regular bash commands to filter this down a little. Next section!

## How did I do it

### Filter down the file results

### Formulate the S3 locations

### Do a dry run on copy

### Run the copy

## What did I do with it

### S3 Select Console Operation Limitations

### Find a small object

### Explore the contents

### Limit selection and record the numbers
