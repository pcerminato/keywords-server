# Keywords

Generates AI enhanced lists of _accepted_ or _denied_ terms based on initial values.

This service generates and stores the lists.

## Replacing nodemon and dotenv with node.js native feats

_Before_
`nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts`

_After_
`node --env-file=.env --watch-path=src --loader ts-node/esm src/server.ts`

> Note: this change requires adapting the repo to ESM support.

# Serverless

## Entry point

Both `./index.ts` and `./server.ts` use `./app.ts`:
- `index.ts` is the entry point for lambda function.
- `server.ts` is the traditional way to start a server as an express app (useful for local dev).

## Docker

There are two stages; 
- `development` simple setup for local development.
- `production` instructions for building the container for AWS ECR.
