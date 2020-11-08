FROM node:12
RUN mkdir -p /usr
WORKDIR /usr

COPY ./package.json .
COPY ./src/app/webpack.config.js webpack.config.js
RUN npm install && npm cache clean --force
COPY ./src /usr

EXPOSE 8080
CMD ["npm", "start"]