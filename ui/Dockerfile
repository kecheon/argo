FROM node:12
WORKDIR /usr/argo/ui

ADD ./package*.json ./
RUN npm install && npm cache clean --force
ADD . .

EXPOSE 8080
CMD ["npm", "start"]