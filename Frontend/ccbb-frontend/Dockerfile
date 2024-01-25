# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV dev


RUN mkdir /app && chown node:node /app

WORKDIR /app

USER node

COPY --chown=node:node ./package.json ./package-lock.json ./
RUN npm i

# Run the application as a non-root user.


# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application.
CMD npm run dev
