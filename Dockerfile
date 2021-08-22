FROM node:14.17.5-alpine3.14
RUN mkdir /app
WORKDIR /app
# Download dependency first to remand cache
COPY ./start.sh /start.sh
RUN chmod +x /start.sh
# Download dependency first to remand cache

CMD ["/start.sh"]