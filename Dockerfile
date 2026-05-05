# 1. Base Stage: Common setup for all environments
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
USER root
RUN npm run build

# 2. Development Stage
FROM base AS development
EXPOSE 8080
CMD ["npm", "run", "dev"] 

# 3. Production Stage (only production files and dependencies and copy to lambda dir)
FROM public.ecr.aws/lambda/nodejs:22 AS production
WORKDIR /app
COPY package*.json .
RUN npm ci --omit=dev
#USER root
ENV NODE_ENV=production
# Copy files to the lambda dir in the image
COPY --from=base /app/dist ${LAMBDA_TASK_ROOT}
COPY --from=base /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules
COPY --from=base /app/package.json ${LAMBDA_TASK_ROOT}
COPY --from=base /app/package-lock.json ${LAMBDA_TASK_ROOT}
CMD [ "index.handler" ]