FROM node:12.22.1-alpine3.11
RUN mkdir /app
WORKDIR /app
# Download dependency first to remand cache
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

CMD ["yarn", "start"]