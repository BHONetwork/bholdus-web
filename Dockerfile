FROM node:14.4.0-alpine3.10
RUN mkdir /app
WORKDIR /app
# Download dependency first to remand cache
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

CMD ["yarn", "start"]