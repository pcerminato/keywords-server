# Sentiment keywords

Generates advertisement blocklists based on sentiment analysis.


This service generates and stores the lists.

> Another system will use the lists to analyse a text (ex. a blog post) and determine the article's sentiment (🙂😐☹️).

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
