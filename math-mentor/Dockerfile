FROM node:18 as base

WORKDIR /math-mentor
COPY package*.json .

FROM base as development
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]

FROM base as production
ENV NODE_ENV=production
RUN npm clean-install
COPY . .
CMD [ "npm", "start" ]