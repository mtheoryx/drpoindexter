---
title: "Using Docker Compose for React Storybook Development"
---

So here's the situation. We have a single Docker container for our Gatsby-based project. We have this hooked up to AWS Amplify for CI/CD. It's looking pretty, here's the Dockerfile

```yaml
#
# Create the installation layer
FROM node:12.7.0-alpine as install

WORKDIR /usr/app

# Install Dependencies
COPY ./package.json ./package-lock.json ./
RUN npm i --silent

#
# Create the application development layer
FROM node:12.7.0-alpine as develop

# Expose Ports
EXPOSE 8000

# Create and change into a directory in the container
WORKDIR /usr/app

COPY --from=install /usr/app/. .

COPY . .

#
# @TODO: Create the testing layer
# A container build should fail here if tests fail
# RUN npm test or static analysis, linting, whatever

#
# @TODO: Create the production build layer
# This should only result in production npm deps installed
FROM node:12.7.0-alpine as production

WORKDIR /usr/app
# Install prod deps
COPY ./package.json ./package-lock.json ./
RUN npm i --production --silent
# Copy code from... somewhere
COPY . .
# Run a gatsby build production
RUN npm run build
# Should just be static files (HTML, JS, CSS, Media assets)
# For later copying

#
# Create the file serving layer (scratch image)
# This should end up with only static files in a file system
# With no actual operating system or binaries

FROM scratch

WORKDIR /build

COPY --from=production /usr/app/public .
# We now should have a directory called public
# With only static files (HTML, JS, CSS, Media assets)

# Default Command - This is never used
CMD [""]

```

And here is our Docker Compose file to make it super easy to spin up, tear down, rebuild with a command like `docker-compose up`. It's amazing! Wanna do it in the background, throw in a `-d` at the end. Need to totally rebuild it? Add a dash of that `--build` flag. It's fantastics.

````yaml

```yml
version: "3.7"

services:
  heroines-site:
    build:
      context: ./public-site
      target: develop
    image: heroines-site
    container_name: heroines-site
    init: true
    command: npm run develop -- -H 0.0.0.0
    ports:
      - 8000:8000
    volumes:
      - /usr/app/node_modules
      - ./public-site:/usr/app
````

This is perfect. It does just what we want, creates a pretty slim image for local. AWS Amplify also builds this from a master-commit, and builds it inside a consistent Docker build container. So we're good!

Okay, so, we have a local build of Gatsby running on `localhost:8000/`. We get access to the GraphQL endpoint at `localhost:8000/__graphql` as well.

What if we wanted to run a parallel container that ran React Storybook? Well that's a different port, and a different concern. We 100% don't want to try to run this in production, but we want that for local development. Trust me, it's very nice.

So we make another container. Consider this a `sidecar container` pattern. It looks like this:

```yml
version: "3.7"

services:
  heroines-site:
    build:
      context: ./public-site
      target: develop
    image: heroines-site
    container_name: heroines-site
    init: true
    command: npm run develop -- -H 0.0.0.0
    ports:
      - 8000:8000
    volumes:
      - /usr/app/node_modules
      - ./public-site:/usr/app
  heroines-storybook:
    build:
      context: ./public-site
      target: develop
    image: heroines-storybook
    container_name: heroines-storybook
    init: true
    command: npm run storybook
    ports:
      - 6006:6006
    volumes:
      - /usr/app/node_modules
      - ./public-site:/usr/app
```

So we have a whole separate container we can bring up, different than the Gatsby container. The command would look like `docker-compose up heroines-storybook` and you will get one running container with storybook, exposing only port `6006`

If you wanted to bring up the whole stack (2 containers) you would use the same familiar command of `docker-compose up`, and as you can guess, if you only want to bring up the Gatsby site, with no storybook, you can use `docker-compose up heroines-site`
