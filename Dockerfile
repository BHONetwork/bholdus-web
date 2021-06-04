FROM node:12.22.1-alpine3.11
RUN mkdir /app
WORKDIR /app
# Download dependency first to remand cache
COPY ./start.sh /start.sh
RUN chmod +x /start.sh
# Download dependency first to remand cache

CMD ["/start.sh"]