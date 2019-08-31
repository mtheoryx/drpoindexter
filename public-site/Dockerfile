#
# Base Image For Installing the Default Starter
FROM node:12.7.0-alpine as installer

#
# Install some build dependencies
RUN apk add --no-cache git

#
# Create and change into our working directory
WORKDIR /usr/installer

#
# Clone the starter repo, and cleanup
RUN git clone https://github.com/gatsbyjs/gatsby-starter-default.git . \
  # && npm install \
  && rm -r .git/ \
  && rm .gitignore

#
# Base Image for app development
FROM node:12.7.0-alpine

# Working directory for app development
WORKDIR /usr/app

# Copy Installer Assets
COPY --from=installer /usr/installer .
